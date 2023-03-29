export enum UserRegisterProblem {
    DATA_IS_MISSING = 'Wypełnij wszystkie pola',
    LOGIN_IS_EXIST = 'Login już istnieje',
    EMAIL_IS_EXIST = 'Mail już istnieje',
    PASS_IS_TO_SHORT = 'Hasło za krótkie',
}

export type UserRegisterResponse = {
    isSucces: true;
} | {
    isSucces: false;
    message: UserRegisterProblem; // informacja zwrotna - dla czego sie nie powiodło.
}