import { ShopProductCategory } from "../types";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
        default: 0,
    })
    price: Number;
    
    @Column({
        default: 0,
        nullable: true,
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
    category: string;

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

}