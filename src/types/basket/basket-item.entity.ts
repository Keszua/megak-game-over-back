export interface AddProductEntity {
    id: string;
    productName: string;
    count: number;
}


export type ListProductFromBasketRes = AddProductEntity[];

export type AddProductToBasketRes = {
    isSuccess: true;
    index: number;
} | {
    isSuccess: false;
}

export interface RemoveProductFromBasketRes {
    isSuccess: boolean;
}