import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShopItem } from 'src/shop/shop-item.entity';
import { UserService } from '../user/user.service';
import { ShopService } from '../shop/shop.service';
import { AddItemEntity, AddProductToBasketRes, GetTotalBasketPriceRes, ListProductFromBasketRes, OneItemInBasketRes, RemoveProductFromBasketRes, UserPermissions } from '../types';
import { BasketItem } from './item-in-basket.entity';
import { User } from '../user/user.entity';

@Injectable()
export class BasketService {
    constructor(
        @Inject(forwardRef( () => ShopService)) private shopService: ShopService,
        @Inject(forwardRef( () => UserService)) private userService: UserService,
    ) {
    }

    filter(product: BasketItem): OneItemInBasketRes {

        return { id: product.id,
            count: product.count,
            price: product.shopItem.price,
            productName: product.shopItem.productName,
            shortDescription: product.shopItem.shortDescription,
            idProduct: product.shopItem.id,
            isPromotion: product.shopItem.isPromotion,
        }
    }

    async list(): Promise<ListProductFromBasketRes> {
        const products: BasketItem[] =  await BasketItem.find();

        const retObject: ListProductFromBasketRes = products.map(this.filter);

        return retObject;
    }

    async getAll(): Promise<BasketItem[]> {
        return BasketItem.find({
            relations: ['shopItem'],
        });
    }

    async getAllForUser(userId: string): Promise<ListProductFromBasketRes> {
        const user = await this.userService.getOneUser(userId);

        if (!user) {
            throw new Error('User not found!');
        }

        const products: BasketItem[] = await BasketItem.find({
            where: { 
                user: {
                    id: userId,
                },
            },
            relations: ['shopItem'],
        });

        const retObject: ListProductFromBasketRes = products.map(this.filter);

        return retObject;
    }
    
    async getAllForAdmin(user: User): Promise<BasketItem[]> {
        const checkUser = this.shopService.checkUserPermission(user, UserPermissions.ADMIN);
        if (checkUser.isSucces === false) {
            return [];
        }

        return BasketItem.find({
            relations: ['shopItem'],
        });
    }
    
    async add(item: AddItemEntity): Promise<AddProductToBasketRes> {
        const {count, productId, userId} = item;
        const shopItem = await this.shopService.getOneItemOfProduct(productId);
        const user = await this.userService.getOneUser(userId);

        if (   typeof productId !== 'string'
            || typeof userId !== 'string'
            || typeof count !== 'number'
            || userId === ''
            || productId === ''
            || count < 1 
            || !shopItem
            || !user
        ) {
            return {
                isSuccess: false,
                message: "Sprawdz dane wejściowe",
            };
        }

        const newItem = new BasketItem();
        newItem.count = count;

        try {
            await newItem.save();

            newItem.shopItem = shopItem;
            newItem.user = user;
    
            await newItem.save();
            
            this.shopService.addBoughtCounter(productId);
    
            return {
                isSuccess: true,
                id: newItem.id,
            };
        } catch (err) {
            return {
                isSuccess: false,
                message: "Nie udało się dodać produktu do koszyka",
            };
        }
    }

    async remove(itemInBadketId: string, userId: string): Promise<RemoveProductFromBasketRes> {
        const user = await this.userService.getOneUser(userId);

        if (!user) {
            throw new Error('User not found!');
        }

        const item = await BasketItem.findOne({
            where: {
                id: itemInBadketId,
                user: {
                    id: userId,
                }
            }
        })
        
        if (item) {
            await item.remove();
        
            return {
                isSuccess: true,
            };
        }
        
        return {
            isSuccess: false,
        };
    }

    async getTotalPrice(userId: string): Promise<GetTotalBasketPriceRes> {
        const items = await this.getAllForUser(userId);

        const price = (await Promise.all(items.map(async item => Number(item.price) * item.count * 1.23 )))
            .reduce((prev, curr) => prev + curr, 0);

        return {
            isSuccess: true,
            price, 
        }
    }

    async clearBasket(userId: string) {
        const user = await this.userService.getOneUser(userId);

        if (!user) {
            throw new Error('User not found!');
        }

        await BasketItem.delete({
            user: {
                id: userId,
            },
        });
        
        return {
            isSuccess: true,
        }
    }
}
