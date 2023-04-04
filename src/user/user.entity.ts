import { BasketItem } from "src/basket/item-in-basket.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserPermissions } from "../types";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        length: 255,
    })
    login: string;
    
    @Column( {
        length: 255,
    })
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: UserPermissions,
        default: UserPermissions.USER,
    })
    permissions: string;

    @Column({
        nullable: true,
        default: null,
    })
    currentTokenId: string | null;

    @OneToMany( type => BasketItem, entity => entity.user)
    itemsInBasket: BasketItem[];
}