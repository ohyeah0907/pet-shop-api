import { Tokens } from "../../types/app-request";

export type AuthLogin = {
    username: string;
    password: string;
}

export type AuthLoginResponse = {
    tokens: Tokens;
    user: {
        id: number;
        name: string;
        email: string;
        phone: string;
        username: string;
    }
}