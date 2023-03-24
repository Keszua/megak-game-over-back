export interface UserRegisterEntity {
    login: string;
    email: string;
    password: string;
}

export enum UserPermissions {
    ADMIN = "admin",
    USER = "user",
}