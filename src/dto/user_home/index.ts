import { Home, User, UserHome } from "@prisma/client";

export type UserHomeCreate = {
    user: User,
    home: Home,
    ha_username: string,
    ha_password: string,
    lan_only: boolean,
    is_owner: boolean,
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

export type UserHomeScheduleCreate = {
    user_home: UserHome,
    started_at: Date,
    ended_at: Date,
    days: [][],
}

export type UserHomeScheduleUpdate = {
    id: number,
    started_at: Date,
    ended_at: Date,
    days: [][],
}
