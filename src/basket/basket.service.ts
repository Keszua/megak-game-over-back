import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShopItem } from 'src/shop/shop-item.entity';
import { UserService } from '../user/user.service';
import { ShopService } from '../shop/shop.service';
import { AddItemEntity, AddProductToBasketRes, GetTotalBasketPriceRes, ListProductFromBasketRes, RemoveProductFromBasketRes } from '../types';
import { BasketItem } from './item-in-basket.entity';

@Injectable()
export class BasketService {
    constructor(
        @Inject(forwardRef( () => ShopService)) private shopService: ShopService,
        @Inject(forwardRef( () => UserService)) private userService: UserService,
    ) {
    }

    async list(): Promise<ListProductFromBasketRes> {
        return BasketItem.find();
    }

    async getAll(): Promise<BasketItem[]> {
        return BasketItem.find({
            relations: ['shopItem'],
        });
    }

    async getAllForUser(userId: string): Promise<BasketItem[]> {
        const user = await this.userService.getOneUser(userId);

        if (!user) {
            throw new Error('User not found!');
        }

        return BasketItem.find({
            where: { 
                user: {
                    id: userId,
                },
            },
            relations: ['shopItem'],
        });
    }
    
    async getAllForAdmin(): Promise<BasketItem[]> {
        return BasketItem.find({
            relations: ['shopItem', 'user'],
        });
    }
    
    async add(item: AddItemEntity): Promise<AddProductToBasketRes> {
        const {count, productId, userId} = item;

        const shopItem = await this.shopService.getOneProduct(productId);
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

        const price = (await Promise.all(items.map(async item => Number(item.shopItem?.price) * item.count * 1.23 )))
            .reduce((prev, curr) => prev + curr, 0);

        return {
            isSuccess: true,
            price, 
        }
    }

    // async countPromo(): Promise<number> {
    //     return ((await this.getTotalPrice()).price) > 10 ? 1 : 0;
    // }

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
