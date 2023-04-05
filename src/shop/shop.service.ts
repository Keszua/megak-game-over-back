import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import { CreateNewProductsRes, DelOneProductsRes, GetListOfProductsRes, GetOneProductsRes, NewShopItemEntity, ShopItemEntity, ShopProductCategory, ShortShopItemEntity, UpdateOneProductsRes, UserPermissions } from '../types';
import { ShopItem } from './shop-item.entity';
import { DeleteResult } from 'typeorm';
import { User } from '../user/user.entity';
import { AddProductDto } from '../types/shop/add-product.dto';
import { MulterDiskUploadedFiles } from '../types/shop/files';

@Injectable()
export class ShopService {
    constructor(
        @Inject(forwardRef( () => BasketService)) private basketService: BasketService,
    ) {
    }

    async getAllProducts(): Promise<GetListOfProductsRes> {
        return await ShopItem.find();
    }

    async getCategoryProducts(category: ShopProductCategory): Promise<GetListOfProductsRes> {
        return await ShopItem.find({where: {category}});
    }

    async getPromotionProducts(): Promise<GetListOfProductsRes> {
        return await ShopItem.find({where: {isPromotion: true}});
    }

    //async getOneProduct(id: string): Promise<GetOneProductsRes> {
    async getOneProduct(id: string): Promise<ShopItem> {
        const product = await ShopItem.findOne({where: {id}});
        if (product) {
            return product;
        }
        
        // return {
        //     isSucces: false,
        // }
    }

    async addProduct(req: AddProductDto, files: MulterDiskUploadedFiles): Promise<ShortShopItemEntity> {
        const photo = files?.photo?.[0] ?? null;
        console.log('photo', photo);

        const shopItem = new ShopItem();
        shopItem.productName = req.name;
        shopItem.description = req.description;
        shopItem.price = req.price;

        if (photo) {
            shopItem.photoFn = photo.filename;
        }

        await shopItem.save();

        return({
            id: shopItem.id,
            productName: shopItem.productName,
            shortDescription: shopItem.shortDescription,
            price: shopItem.price,
            quantity: shopItem.quantity,
            quantityInfinity: shopItem.quantityInfinity,
            isPromotion: shopItem.isPromotion,
        })
    }

    async createNewProducts(newItem: NewShopItemEntity, user: User): Promise<CreateNewProductsRes> {
        const { productName, shortDescription, price, quantity, quantityInfinity, imgUrl, isPromotion, description, show } = newItem;
    
        if (!user) {
            return {
                isSucces: false,
                message: "Nie wykryto użytkownika",
            }
        }

        if (user.permissions !== UserPermissions.ADMIN) {
            return {
                isSucces: false,
                message: "Nie masz uprawnień",
            }
        }

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

        const item = new ShopItem();
        item.productName = productName;
        item.shortDescription = shortDescription;
        item.price = price;
        item.quantity = quantity;
        item.isPromotion = isPromotion;
        item.description = description;
        item.show = show;

        try {
            await item.save();

            return (
                item
            )
        } catch (err) {
            return ({
                isSucces: false,
            })
        }
        
    }

    async updateProduct(item: ShopItemEntity, user: User): Promise<UpdateOneProductsRes> {
        const { id } = item;

        if (user.permissions !== UserPermissions.ADMIN) {
            return {
                isSucces: false,
            }
        }

        try {
            await ShopItem.update(id, {
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

    async hasProduct(name: string): Promise<boolean> { //TODO przerobić name an ID
        return (await this.getAllProducts()).some((item: any) => item.productName === name);
    }

    async removeOneProduct(id: string, user: User): Promise<DelOneProductsRes> {
        if (user.permissions !== UserPermissions.ADMIN) {
            return {
                isSucces: false,
            }
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
