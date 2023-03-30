import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { AddProductEntity, ListProductFromBasketRes, RemoveProductFromBasketRes } from '../types';
import { BasketService } from './basket.service';

@Controller('basket')
export class BasketController {
    constructor(
        @Inject(BasketService) private basketService: BasketService
    ) { }

    @Get('/')
    listProductsInBasket(): Promise<ListProductFromBasketRes> {
        return this.basketService.list();
    }

    @Post('/')
    addProductToBasket(
        @Body() item: AddProductEntity,
    ) {
        return this.basketService.add(item);
    }

    @Delete('/:index')
    removeProductFromBasket(
        @Param('index') index: string,
    ): Promise<RemoveProductFromBasketRes> {
        return this.basketService.remove(index);
    }
}
