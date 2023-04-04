import { forwardRef, Inject, Injectable } from '@nestjs/common';
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
        const {productName, count, id} = item;
        
        if (   typeof productName !== 'string'
            || typeof count !== 'number'
            || productName === ''
            || count < 1 
            || !(await this.shopService.hasProduct(productName))
        ) {
            return {
                isSuccess: false,
            };
        }
        
        const newItem = new BasketItem();
        newItem.productName = productName;
        newItem.count = count;
        
        await newItem.save();
        
        this.shopService.addBoughtCounter(id);

        return {
            isSuccess: true,
            id: newItem.id,
        };
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

    async getTotalPrice(): Promise<GetTotalBasketPriceRes> {
        const items = await this.list();

        const price = (await Promise.all(items.map(async item => (await this.shopService.getPrice(item.id) ) * item.count * 1.23 )))
            .reduce((prev, curr) => prev + curr, 0);
        
        return {
            isSuccess: true,
            price, 
        }
    }


    async countPromo(): Promise<number> {
        return ((await this.getTotalPrice()).price) > 10 ? 1 : 0;
    }
}
