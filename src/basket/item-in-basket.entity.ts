import { AddItemEntity } from "../types";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BasketItem extends BaseEntity implements AddItemEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 60,
        default: '',

    })
    productName: string;
    
    @Column({
        default: 0,
    })
    count: number;

}