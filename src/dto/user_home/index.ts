import { Home, User } from "@prisma/client";

export type UserHomeCreate = {
    user: User,
    home: Home,
    ha_username: string,
    ha_password: string,
    lan_only: boolean,
    is_owner: boolean,
    ordering: number,
}

export type UserHomeUpdate = {
    id: number,
    user: User,
    home: Home,
    ha_username: string,
    ha_password: string,
    lan_only: boolean,
    is_owner: boolean,
    ordering: number,
}

export type UserHomeSearch = {
    user: User,
    home: Home,
}