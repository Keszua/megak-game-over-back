import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import { CreateNewProductsRes, DelOneProductsRes, GetListOfProductsRes, GetOneProductsRes, NewShopItemEntity, ShopItemEntity, ShopProductCategory, ShortShopItemEntity, StandartShopRes, UpdateOneProductsRes, UserPermissions } from '../types';
import { ShopItem } from './shop-item.entity';
import { DeleteResult } from 'typeorm';
import { User } from '../user/user.entity';
import { AddPhotoToProductDto } from '../types/shop/add-product.dto';
import { MulterDiskUploadedFiles } from '../types/shop/files';
import * as fs from 'fs';
import * as path from 'path';
import { storageDir } from '../utils/storage';


@Injectable()
export class ShopService {
    constructor(
        @Inject(forwardRef( () => BasketService)) private basketService: BasketService,
    ) {
    }

    filterShort(shopItem: ShopItem): ShortShopItemEntity {
        const {id, productName, shortDescription, price, quantity, quantityInfinity, isPromotion } = shopItem;
        return {id, productName, shortDescription, price, quantity, quantityInfinity, isPromotion};
    }

    filterDetails(shopItem: ShopItem): ShopItemEntity {
        const {id, productName, shortDescription, price, quantity, quantityInfinity, isPromotion, description, category } = shopItem;
        return {id, productName, shortDescription, price, quantity, quantityInfinity, isPromotion, description, category};
    }

    async getAllProducts(): Promise<GetListOfProductsRes> {
        return (await ShopItem.find()).map(this.filterShort);
    }

    async getCategoryProducts(category: ShopProductCategory): Promise<GetListOfProductsRes> {
        return (await ShopItem.find({where: {category}})).map(this.filterShort);
    }

    async getPromotionProducts(): Promise<GetListOfProductsRes> {
        return (await ShopItem.find({where: {isPromotion: true}})).map(this.filterShort);
    }

    async getOneProduct(id: string): Promise<GetOneProductsRes> { //TODO - mam problem na froncie z obsługą różnych typów
    //async getOneProduct(id: string): Promise<ShopItem> {
        const product = await ShopItem.findOne({where: {id}})
        
        if (product) {
            return this.filterDetails(product);
        }
        
        return {
            isSucces: false,
        }
    }

    async getOneItemOfProduct(id: string): Promise<ShopItem> {
        const product = await ShopItem.findOne({where: {id}})

        if (product) {
            return product;
        }
    }

    async getPhoto(id: string, res: any): Promise<any>{
        try {
            const one = await ShopItem.findOne({where: {id}});

            if (!one) {
                res.json( {
                    isSucces: false,
                    message: "Nie odnaleziono produktu",
                });
                // throw new Error('No object found!');
            }

            if (!one.photoFn) {
                res.json( {
                    isSucces: false,
                    message: "Nie odnaleziono obrazu",
                });
                // throw new Error('No photo in this entity!');
            }

            res.sendFile(
                one.photoFn,
                {
                    root: path.join(storageDir(), 'product-photos'),
                }
            )
        } catch (err) {
            res.json( {
                isSucces: false,
                message: err,
            });
        } 
    }

    async addPhotoToProduct(req: AddPhotoToProductDto, files: MulterDiskUploadedFiles): Promise<StandartShopRes> {
        const photo = files?.photo?.[0] ?? null;
    
        try {
            if (photo) {
                await ShopItem.update(req.id, {
                    photoFn: photo.filename,
                })
            } else {
                return {
                    isSucces: false,
                    message: "Brak fotografii",
                }
            }
    
            return {
                isSucces: true,
            }
        } catch (err) {
            try {
                if (photo) {
                    fs.unlinkSync(
                        path.join(storageDir(), 'product-photos', photo.filename),
                    );
                }
            } catch (r2) { }

            //throw new Error(`Problem z dodaniem fotografii ${err}`);
            return {
                isSucces: false,
                message: "Problem z dodaniem fotografii",
            }
        }
    }


    checkUserPermission = (user: User, perm: UserPermissions): StandartShopRes => {
        if (!user) {
            return {
                isSucces: false,
                message: "Nie wykryto użytkownika",
            }
        }

        switch (perm) {
            case UserPermissions.ADMIN:
                if (user.permissions === UserPermissions.ADMIN) {
                    return ({
                        isSucces: true,
                    })
                };
            case UserPermissions.USER:
                if (user.permissions === UserPermissions.USER || user.permissions === UserPermissions.ADMIN) {
                    return ({
                        isSucces: true,
                    })
                };
            default:
                return {
                    isSucces: false,
                    message: "Nie masz uprawnień",
                };
        }
    }

    checkItem = (item: NewShopItemEntity): StandartShopRes => {
        const { productName, shortDescription, price, quantity, quantityInfinity, imgUrl, isPromotion, description, show } = item;

        if (productName.length > 60) {
            return ({
                isSucces: false,
                message: "Nazwa produktu nie moze przekraczać 60 znaków",
            })
        }

        if (shortDescription.length > 255) {
            return ({
                isSucces: false,
                message: "Skrócony opis nie może przekraczać 255 znaków",
            })
        }

        if ( price < 0) {
            return ({
                isSucces: false,
                message: "Cena nie może być mniejsza niż zero",
            })
        }

        if ( price > 99999999) {
            return ({
                isSucces: false,
                message: "Cena nie może przekraczać 99 999 999",
            })
        }

        if (imgUrl && imgUrl.length > 255) {
            return ({
                isSucces: false,
                message: "adres linku nie może przekraczać 255 znaków",
            })
        }

        return ({
            isSucces: true,
        })
    }

    async createNewProducts(newItem: NewShopItemEntity, user: User): Promise<CreateNewProductsRes> {
        const checkUser = this.checkUserPermission(user, UserPermissions.ADMIN);
        if (checkUser.isSucces === false) {
            return ({
                isSucces: false,
                message: checkUser.message,
            })
        }
        
        const checkItem: StandartShopRes = this.checkItem(newItem);
        if (checkItem.isSucces === false) {
            return { 
                isSucces: false,
                message: checkItem.message,
            };
        }

        const { productName, shortDescription, price, quantity, quantityInfinity, isPromotion, description, show } = newItem;

        const item = new ShopItem();
        item.productName = productName;
        item.shortDescription = shortDescription;
        item.price = price;
        item.quantity = quantity;
        item.quantityInfinity = quantityInfinity;
        item.isPromotion = isPromotion;
        item.description = description;
        item.show = show;

        try {
            await item.save();

            return ({
                isSucces: true,
                id: item.id,
            })
        } catch (err) {
            return ({
                isSucces: false,
                message: "Problem z dodaniem nowego produktu.",
            })
        }
    }

    async updateProduct(item: ShopItemEntity, user: User): Promise<UpdateOneProductsRes> {
        const checkUser = this.checkUserPermission(user, UserPermissions.ADMIN);
        if (checkUser.isSucces === false) {
            return checkUser;
        }

        const checkItem: StandartShopRes = this.checkItem(item);
        if (checkItem.isSucces === false) {
            return checkItem;
        }

        try {
            await ShopItem.update(item.id, {
            ...item
            });

            return ({
                isSucces: true,
            })
        } catch (err) {
            return ({
                isSucces: false,
            });
        }
    }

    async addBoughtCounter(id: string) {
        await ShopItem.update(id, {
            wasEverBought: true,
        })

        const item = await ShopItem.findOne({where: {id}});

        item.boughtCounter++;

        await item.save();
    }

    async hasProduct(id: string): Promise<boolean> {
        return (await this.getAllProducts()).some((item: any) => item.id === id);
    }

    async removeOneProduct(id: string, user: User): Promise<DelOneProductsRes> {
        const checkUser = this.checkUserPermission(user, UserPermissions.ADMIN);
        if (checkUser.isSucces === false) {
            return checkUser;
        }

        const res: DeleteResult = await ShopItem.delete(id);
        if (res.affected) {
            return {
                isSucces: true,
            }
        }
        
        return {
            isSucces: false,
        }
    }

    async getPrice(id: string): Promise<number> {
        const product = await ShopItem.findOne({where: {id}});
        if (product) {
            return Number(product.price);
        }
        
        return 0;
    }
}
