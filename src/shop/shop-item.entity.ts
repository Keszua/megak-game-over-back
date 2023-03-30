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
        precision: 6,
        scale: 2,
        default: 0,
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
        default: true,
    })
    show: boolean;

    @Column({
        default: () => 'CURRENT_TIMESTAMP',
    })
    createAt: Date;

}