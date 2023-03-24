import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
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
}