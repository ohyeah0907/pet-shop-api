import { Role, RoleHouse } from "@prisma/client"

export type RoleScheduleCreate = {
    role_house: RoleHouse,
    started_at: Date,
    ended_at: Date,
}

export type RoleScheduleUpdate = {
    id: number,
    role_house: RoleHouse,
    started_at: Date,
    ended_at: Date,
}