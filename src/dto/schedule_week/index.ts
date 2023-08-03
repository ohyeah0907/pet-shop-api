import { RoleSchedule } from "@prisma/client"

export type ScheduleWeekCreate = {
    schedule: RoleSchedule,
    week_day: number,
    enable: boolean,
}

export type ScheduleWeekUpdate = {
    id: number,
    schedule: RoleSchedule,
    week_day: number,
    enable: boolean,
}