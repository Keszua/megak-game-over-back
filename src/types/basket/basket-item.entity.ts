export interface AddItemEntity {
    productId: string;
    userId: string;
    count: number;
}

export interface OneItemInBasket {
    id: string;
    count: number;
}

export type GetBasketResponse = OneItemInBasket[];

export type ListProductFromBasketRes = OneItemInBasket[];

export type AddProductToBasketRes = {
    isSuccess: true;
    id: string;
} | {
    isSuccess: false;
}

export interface RemoveProductFromBasketRes {
    isSuccess: boolean;
}

export interface GetTotalBasketPriceRes {
    isSuccess: boolean;
    price?: number;
}