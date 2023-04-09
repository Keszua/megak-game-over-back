import { Body, Controller, Delete, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { AddItemEntity, AddProductToBasketRes, GetTotalBasketPriceRes, ListProductFromBasketRes, RemoveProductFromBasketRes } from '../types';
import { BasketService } from './basket.service';
import { BasketItem } from './item-in-basket.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserObj } from '../decorators/user-obj.decorator';
import { User } from "../user/user.entity";

@Controller('/basket')
export class BasketController {
    constructor(
        @Inject(BasketService) private basketService: BasketService
    ) { }

    @Get('/admin')
    @UseGuards(AuthGuard('jwt'))
    allProductsInBasketForAdmin(
        @UserObj() user: User
    ): Promise<BasketItem[]> {
        return this.basketService.getAllForAdmin(user);
    }

    @Get('/:userId')
    @UseGuards(AuthGuard('jwt'))
    allProductsInBasketForUser(
        @Param('userId') userId: string,
    ): Promise<ListProductFromBasketRes> {
        return this.basketService.getAllForUser(userId);
    }

    @Get('/total-price/:userId')
    @UseGuards(AuthGuard('jwt'))
    getTtoalProce(
        @Param('userId') userId: string,
    ): Promise<GetTotalBasketPriceRes> {
        return this.basketService.getTotalPrice(userId);
    }

    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    addProductToBasket(
        @Body() item: AddItemEntity,
    ): Promise<AddProductToBasketRes> {
        return this.basketService.add(item);
    }

    @Delete('/all/:userId')
    @UseGuards(AuthGuard('jwt'))
    clearBasket(
        @Param('userId') userId: string,
    ): Promise<RemoveProductFromBasketRes> {
        return this.basketService.clearBasket(userId);
    }

    @Delete('/:itemInBadketId/:userId')
    @UseGuards(AuthGuard('jwt'))
    removeProductFromBasket(
        @Param('itemInBadketId') itemInBadketId: string,
        @Param('userId') userId: string,
    ): Promise<RemoveProductFromBasketRes> {
        return this.basketService.remove(itemInBadketId, userId);
    }

}
