export interface AddItemEntity {
    id: string;
    productName: string;
    count: number;
}


export type ListProductFromBasketRes = AddItemEntity[];

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