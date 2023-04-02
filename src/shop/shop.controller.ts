import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { CreateNewProductsRes, DelOneProductsRes, GetListOfProductsRes, GetOneProductsRes, NewShopItemEntity } from '../types';
import { ShopService } from './shop.service';

@Controller('/shop')
export class ShopController {
    constructor(
        @Inject(ShopService) private shopService: ShopService,
    ) { }
    

    @Get('/')
    getListOfProducts(): Promise<GetListOfProductsRes> {
        return this.shopService.getAllProducts();
    }

    @Get('/category/:category')
    getCategoryProducts(
        @Param('category') category: string,
    ): Promise<GetListOfProductsRes> {
        return this.shopService.getCategoryProducts(category);
    }

    @Get('/promotion')
    getListOfPromotionProducts(): Promise<GetListOfProductsRes> {
        return this.shopService.getPromotionProducts();
    }

    @Get('/:id')
    getOneProducts(
        @Param('id') id: string,
    ): Promise<GetOneProductsRes> {
        return this.shopService.getOneProduct(id);
    }

    @Post('/')
    createNewProducts(
        @Body() newItem: NewShopItemEntity,
    ): Promise<CreateNewProductsRes> {
        return this.shopService.createNewProducts(newItem);
    }

    @Delete('/:id')
    removeOneProducts(
        @Param('id') id: string,
    ): Promise<DelOneProductsRes> {
        return this.shopService.removeOneProduct(id);
    }

}
