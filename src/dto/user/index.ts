import { UserSocial } from "@prisma/client";

export type UserCreate = {
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    is_voice: boolean;
    verification_token: string;
    social?: UserSocial
}

export type UserUpdate = {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    username?: string;
    password?: string;
    is_admin?: boolean;
    is_locked?: boolean;
    is_voice?: boolean;
    is_verified?: boolean;
}