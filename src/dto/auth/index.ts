import { Tokens } from "../../types/app-request";

export type AuthLogin = {
    username: string;
    password: string;
}

export type AuthLoginResponse = {
    tokens: Tokens;
    user: UserInfo;
}

export type UserInfo = {
    id: number;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    username: string;
}