import { UserSchedule } from "@prisma/client"

export type ScheduleWeekCreate = {
    schedule: UserSchedule,
    week_day: number,
    enable: boolean,
}

export type ScheduleWeekUpdate = {
    id: number,
    schedule: UserSchedule,
    week_day: number,
    enable: boolean,
}