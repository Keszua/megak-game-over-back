import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { BasketService } from '../basket/basket.service';
import { CreateNewProductsRes, DelOneProductsRes, GetListOfProductsRes, GetOneProductsRes, NewShopItemEntity } from 'src/types';
import { InjectRepository } from '@nestjs/typeorm';
import { ShopItem } from './shop-item.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class ShopService {
    constructor(
        @Inject(forwardRef( () => BasketService)) private basketService: BasketService,
    ) {
    }

    async getProducts(): Promise<GetListOfProductsRes> {
        return await ShopItem.find();
    }

    async getOneProduct(id: string): Promise<GetOneProductsRes> {
        const product = await ShopItem.findOne({where: {id}});
        if (product) {
            return product;
        }
        
        return {
            isSucces: false,
        }
    }

    async createNewProducts(newItem: NewShopItemEntity): Promise<CreateNewProductsRes> {
        const { description } = newItem;
        
        const item = new ShopItem();
        item.description = description;
        
        try {
            await item.save();
            console.log("new item", item);

            return (
                item
            )
        } catch (err) {
            return ({
                isSucces: false,
            })
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

    async hasProduct(name: string): Promise<boolean> {
        return (await this.getProducts()).some((item: any) => item.name === name);
    }

    async removeOneProduct(id: string): Promise<DelOneProductsRes> {
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

}
