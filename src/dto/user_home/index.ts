import { RoleHome, User } from "@prisma/client";

export type UserHomeCreate = {
    user: User,
    role_home: RoleHome,
    ha_username: string,
    ha_password: string,
    ordering: number,
}

export type UserHomeUpdate = {
    id: number,
    user: User,
    role_home: RoleHome,
    ha_username: string,
    ha_password: string,
    ordering: number,
}