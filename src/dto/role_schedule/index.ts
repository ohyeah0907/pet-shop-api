import { Role, RoleHome } from "@prisma/client"

export type RoleScheduleCreate = {
    role_home: RoleHome,
    started_at: Date,
    ended_at: Date,
}

export type RoleScheduleUpdate = {
    id: number,
    role_home: RoleHome,
    started_at: Date,
    ended_at: Date,
}