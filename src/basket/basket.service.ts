import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { AddProductEntity, AddProductToBasketRes, ListProductFromBasketRes, RemoveProductFromBasketRes } from '../types';

@Injectable()
export class BasketService {
    private items: AddProductEntity[] = [];

    constructor(
        @Inject(forwardRef( () => ShopService)) private shopService: ShopService,
    ) {
    }

    async list(): Promise<ListProductFromBasketRes> {
        return this.items;
    }

    async add(item: AddProductEntity): Promise<AddProductToBasketRes> {
        const {productName, count} = item;
        
        if (
               typeof productName !== 'string'
            || typeof count !== 'number'
            || productName === ''
            || count < 1 
            || !this.shopService.hasProduct(productName)
        ) {
            return {
                isSuccess: false,
            };
        }
        
        this.items.push(item);
        
        return {
            isSuccess: true,
            index: 1,
        };
    }

    async remove(index: string): Promise<RemoveProductFromBasketRes> {
        return {
            isSuccess: true,
        };
    }

    // async countPromo(): Promise<number> {
    //     return (await this.getTotalPrice()) > 10 ? 1 : 0;
    // }
}
