import { RoleSchedule } from "@prisma/client"

export type ScheduleHourCreate = {
    schedule: RoleSchedule,
    started_hour: number,
    ended_hour: number,
}

export type ScheduleHourUpdate = {
    id: number,
    schedule: RoleSchedule,
    started_hour: number,
    ended_hour: number,
}