import { Role } from "@prisma/client"

export type UserCreate = {
    name: string;
    email: string;
    phone: string;
    username: string;
    password: string;
    role: Role;
    is_voice: boolean;
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
    role?: Role;
    is_voice?: boolean;
}