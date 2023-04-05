import { ShopProductCategory } from "../types";
import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BasketItem } from "src/basket/item-in-basket.entity";

@Entity()
export class ShopItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 60,
        default: 'Nazwa produktu',
    })
    productName: string;

    @Column({
        length: 255,
        default: 'Krótki opis',
    })
    shortDescription: string;

    @Column({
        type: 'text',
    })
    description: string;

    @Column({
        type: 'float',
        precision: 10,
        scale: 2,
        default: 1,
    })
    price: Number;
    
    @Column({
        default: 0,
    })
    quantity: Number;
    
    @Column({
        default: false,
    })
    quantityInfinity: boolean;
    
    @Column({
        length: 255,
        default: null,
        nullable: true,
    })
    imgUrl: string | null;

    @Column({
        default: 0,
    })
    boughtCounter: number;

    @Column({
        default: null,
        nullable: true,
    })
    photoFn: string;

    // pola dla administratora ------------------------------------------------
    @Column({
        default: true,
    })
    show: boolean;

    @Column({
        type: "enum",
        enum: ShopProductCategory,
        default: ShopProductCategory.PRODUCT,
    })
    category: ShopProductCategory;

    @Column({
        default: false,
    })
    isPromotion: boolean;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

    @Column({
        default: false,
    })
    wasEverBought: boolean;

    // relacje ----------------------------------------------------------------
    @OneToMany(type => BasketItem, entity => entity.shopItem)
    itemsInBasket: BasketItem[];
}