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

    async getAllProducts(): Promise<GetListOfProductsRes> {
        return await ShopItem.find();
    }

    async getCategoryProducts(category: string,): Promise<GetListOfProductsRes> {
        return await ShopItem.find({where: {category}});
    }

    async getPromotionProducts(): Promise<GetListOfProductsRes> {
        return await ShopItem.find({where: {isPromotion: true}});
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
        const { productName, shortDescription, description, price, imgUrl } = newItem;
        

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

        if ( price > 99999999) {
            return ({
                isSucces: false,
                message: "Cena nie może przekraczać 99 999 999",
            })
        }

        if (imgUrl.length > 255) {
            return ({
                isSucces: false,
                message: "adres linku nie może przekraczać 255 znaków",
            })
        }

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
        return (await this.getAllProducts()).some((item: any) => item.name === name);
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
