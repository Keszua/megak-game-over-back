import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { AddItemEntity, AddProductToBasketRes, GetTotalBasketPriceRes, ListProductFromBasketRes, RemoveProductFromBasketRes } from '../types';
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

    @Get('/total-price')
    getTtoalProce(): Promise<GetTotalBasketPriceRes> {
        return this.basketService.getTotalPrice();
    }

    @Post('/')
    addProductToBasket(
        @Body() item: AddItemEntity,
    ): Promise<AddProductToBasketRes> {
        return this.basketService.add(item);
    }

    @Delete('/all')
    clearBasket(
    ): Promise<RemoveProductFromBasketRes> {
        return this.basketService.clearBasket();
    }

    @Delete('/:index')
    removeProductFromBasket(
        @Param('index') index: string,
    ): Promise<RemoveProductFromBasketRes> {
        return this.basketService.remove(index);
    }

}
