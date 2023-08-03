import { RoleHouse, User } from "@prisma/client";

export type UserHouseCreate = {
    user: User,
    role_house: RoleHouse,
    ha_username: string,
    ha_password: string,
    ordering: number,
}

export type UserHouseUpdate = {
    id: number,
    user: User,
    role_house: RoleHouse,
    ha_username: string,
    ha_password: string,
    ordering: number,
}