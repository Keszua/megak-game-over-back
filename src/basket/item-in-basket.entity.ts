import { BaseEntity, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ShopItem } from "../shop/shop-item.entity";
import { User } from "../user/user.entity";

@Entity()
export class BasketItem extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        default: 0,
    })
    count: number;

    // Pojedynczy element w koszyku bedzie zawierał tylko jeden produkt
    // Jeden produkt, może być w wielu koszkach
    @ManyToOne( type => ShopItem, entity => entity.itemsInBasket )
    @JoinColumn()
    shopItem: ShopItem;

    @ManyToOne( type => User, entity => entity.itemsInBasket)
    @JoinColumn()
    user: User;
}