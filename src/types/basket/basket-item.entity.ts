export interface AddItemEntity {
    productId: string;
    userId: string;
    count: number;
}

export interface OneItemInBasketRes {
    id: string;
    idProduct: string;
    productName: string;
    count: number;
    price: number;
    shortDescription: string;
    isPromotion: boolean;
}

export type ListProductFromBasketRes = OneItemInBasketRes[];

export type AddProductToBasketRes = {
    isSuccess: true;
    id: string;
} | {
    isSuccess: false;
    message: string,
}

export interface RemoveProductFromBasketRes {
    isSuccess: boolean;
}

export interface GetTotalBasketPriceRes {
    isSuccess: boolean;
    price?: number;
}