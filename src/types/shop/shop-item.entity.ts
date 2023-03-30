export interface ShopItemEntity {
    id: string;
    productName: string;
    shortDescription: string;
    description: string;
    price: Number;
    quantity: Number;
    quantityInfinity?: boolean;
    imgUrl?: string;
    show: boolean;
}

export type NewShopItemEntity = Omit<ShopItemEntity, 'id'>;

export type GetListOfProductsRes = ShopItemEntity[];

export type GetOneProductsRes = ShopItemEntity | {
    isSucces: false,
};

export interface DelOneProductsRes {
    isSucces: boolean,
};

export type CreateNewProductsRes = ShopItemEntity | {
    isSucces: false,
};