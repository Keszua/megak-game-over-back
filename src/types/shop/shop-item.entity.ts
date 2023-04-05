export enum ShopProductCategory {
    PRODUCT = "product",
    SERVICE = "service",
}

export interface ShortShopItemEntity { // dla wyświetlenia listy produktów
    id: string;
    productName: string;
    shortDescription: string;
    price: number;
    quantity: number;
    quantityInfinity: boolean;
    isPromotion: boolean;
}

export interface ShopItemEntity extends  ShortShopItemEntity { // dla wyświetlenia karty produktu
    description: string;
    category: ShopProductCategory;
    show?: boolean;
    imgUrl?: string | null;
    photoFn?: string | null;
}

export interface StandartShopRes {
    isSucces: boolean,
    message?: string,
}

export type NewShopItemEntity = Omit<ShopItemEntity, 'id'>; // dla tworzenia nowego rekordu w bazie

export type GetListOfProductsRes = ShortShopItemEntity[];

export type GetOneProductsRes = ShopItemEntity | {
    isSucces: false,
};

export type CreateNewProductsRes = ShopItemEntity | {
    isSucces: false,
    message?: string,
};

export interface UpdateOneProductsRes {
    isSucces: boolean,
    message?: string,
};

export interface DelOneProductsRes {
    isSucces: boolean,
};
