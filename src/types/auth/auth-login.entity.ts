import { UserPermissions } from "../user";

export interface AuthLoginEntity {
    email: string;
    password: string;
}


export enum AuthLoginResProblem {
    INVALID_LOGIN = 'Invalid login data!'
}

export type AuthLoginResponse = {
    isSucces: true;
    login: string;
    role: UserPermissions;
} | {
    isSucces: false;
    message: AuthLoginResProblem | string; // informacja zwrotna - dla czego sie nie powiodło.
}