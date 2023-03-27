export class AuthLoginEntity {
    email: string;
    password: string;
}


export enum AuthLoginResProblem {
    INVALID_LOGIN = 'Invalid login data!'
}

export type AuthLoginResponse = {
    isSucces: true;
} | {
    isSucces: false;
    message: AuthLoginResProblem | string; // informacja zwrotna - dla czego sie nie powiodło.
}