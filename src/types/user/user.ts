export enum UserRegisterProblem {
    DATA_IS_MISSING = 'Some data is missing',
    USER_IS_EXIST = 'User already exists',
    PASS_IS_TO_SHORT = 'Password too short',
}

export type UserRegisterResponse = {
    isSucces: true;
} | {
    isSucces: false;
    message: UserRegisterProblem; // informacja zwrotna - dla czego sie nie powiodło.
}