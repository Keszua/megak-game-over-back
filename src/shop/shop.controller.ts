import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/user.entity';
import { UserObj } from '../decorators/user-obj.decorator';
import { CreateNewProductsRes, DelOneProductsRes, GetListOfProductsRes, GetOneProductsRes, NewShopItemEntity, ShopItemEntity, ShopProductCategory, UpdateOneProductsRes } from '../types';
import { ShopService } from './shop.service';
import { AddProductDto } from 'src/types/shop/add-product.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { storageDir } from '../utils/storage';

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
        @Param('category') category: ShopProductCategory,
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

    @Post('/photo')
    @UseInterceptors(
        FileFieldsInterceptor([
            {
                name: 'photo', maxCount: 1,
            },
        ], {dest: path.join(storageDir(), 'product-photos')},
        )
    )
    
    addProduct(
        @Body() req: AddProductDto,
    ): Promise<ShopItemEntity> {
        return this.shopService.addProduct(req);
    }


    @Post('/')
    @UseGuards(AuthGuard('jwt'))
    createNewProducts(
        @Body() newItem: NewShopItemEntity,
        @UserObj() user: User,
    ): Promise<CreateNewProductsRes> {
        return this.shopService.createNewProducts(newItem, user);
    }

    @Put('/')
    @UseGuards(AuthGuard('jwt'))
    updateProduct(
        @Body() item: ShopItemEntity,
        @UserObj() user: User,
    ): Promise<UpdateOneProductsRes> {
        return this.shopService.updateProduct(item, user);
    }

    @Delete('/:id')
    @UseGuards(AuthGuard('jwt'))
    removeOneProducts(
        @Param('id') id: string,
        @UserObj() user: User,
    ): Promise<DelOneProductsRes> {
        return this.shopService.removeOneProduct(id, user);
    }

}
