export interface ShortShopItemEntity { // dla wyświetlenia listy produktów
    id: string;
    productName: string;
    shortDescription: string;
    price: Number;
    quantity: Number | null;
    imgUrl: string | null;
}

export interface ShopItemEntity extends  ShortShopItemEntity { // dla wyświetlenia karty produktu
    description: string;
    show: boolean;
}

export type NewShopItemEntity = Omit<ShopItemEntity, 'id'>; // dla tworzenia nowego rekordu w bazie

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