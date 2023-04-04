import { Body, Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { AddItemEntity, AddProductToBasketRes, GetTotalBasketPriceRes, ListProductFromBasketRes, RemoveProductFromBasketRes } from '../types';
import { BasketService } from './basket.service';
import { BasketItem } from './item-in-basket.entity';

@Controller('basket')
export class BasketController {
    constructor(
        @Inject(BasketService) private basketService: BasketService
    ) { }

    @Get('/')
    listProductsInBasket(): Promise<ListProductFromBasketRes> {
        return this.basketService.list();
    }

    @Get('/all')
    allProductsInBasket(): Promise<BasketItem[]> {
        return this.basketService.getAll();
    }

    @Get('/admin')
    allProductsInBasketForAdmin(): Promise<BasketItem[]> {
        return this.basketService.getAllForAdmin();
    }

    @Get('/:userId')
    allProductsInBasket2(
        @Param('userId') userId: string,
    ): Promise<BasketItem[]> {
        return this.basketService.getAllForUser(userId);
    }

    @Get('/total-price/:userId')
    getTtoalProce(
                @Param('userId') userId: string,
    ): Promise<GetTotalBasketPriceRes> {
        return this.basketService.getTotalPrice(userId);
    }

    @Post('/')
    addProductToBasket(
        @Body() item: AddItemEntity,
    ): Promise<AddProductToBasketRes> {
        return this.basketService.add(item);
    }

    @Delete('/all/:userId')
    clearBasket(
        @Param('userId') userId: string,
    ): Promise<RemoveProductFromBasketRes> {
        return this.basketService.clearBasket(userId);
    }

    @Delete('/:itemInBadketId/:userId')
    removeProductFromBasket(
        @Param('itemInBadketId') itemInBadketId: string,
        @Param('userId') userId: string,
    ): Promise<RemoveProductFromBasketRes> {
        return this.basketService.remove(itemInBadketId, userId);
    }

}
