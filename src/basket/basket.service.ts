import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShopItem } from 'src/shop/shop-item.entity';
import { ShopService } from '../shop/shop.service';
import { AddItemEntity, AddProductToBasketRes, GetTotalBasketPriceRes, ListProductFromBasketRes, RemoveProductFromBasketRes } from '../types';
import { BasketItem } from './item-in-basket.entity';

@Injectable()
export class BasketService {
    constructor(
        @Inject(forwardRef( () => ShopService)) private shopService: ShopService,
    ) {
    }

    async list(): Promise<ListProductFromBasketRes> {
        return BasketItem.find();
    }
    
    async add(item: AddItemEntity): Promise<AddProductToBasketRes> {
        const {id, count} = item;

        const shopItem = await this.shopService.getOneProduct(id);

        if (   typeof id !== 'string'
            || typeof count !== 'number'
            || id === ''
            || count < 1 
            || !shopItem
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
    
            await newItem.save();
            
            this.shopService.addBoughtCounter(id);
    
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

    async remove(id: string): Promise<RemoveProductFromBasketRes> {
        const item = await BasketItem.findOne({where: {id}})
        
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

    async getAll(): Promise<BasketItem[]> {
        return BasketItem.find({
            relations: ['shopItem'],
        });
    }

    async getTotalPrice(): Promise<GetTotalBasketPriceRes> {
        const items = await this.getAll();

        const price = (await Promise.all(items.map(async item => Number(item.shopItem?.price) * item.count * 1.23 )))
            .reduce((prev, curr) => prev + curr, 0);

        return {
            isSuccess: true,
            price, 
        }
    }

    async countPromo(): Promise<number> {
        return ((await this.getTotalPrice()).price) > 10 ? 1 : 0;
    }

    async clearBasket() {
        await BasketItem.delete({});
        
        return {
            isSuccess: true,
        }
    }
}
