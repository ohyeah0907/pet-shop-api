import { ScheduleWeek } from "@prisma/client"

export type ScheduleHourCreate = {
    schedule_week: ScheduleWeek,
    started_hour: number,
    ended_hour: number,
}

export type ScheduleHourUpdate = {
    id: number,
    schedule_week?: ScheduleWeek,
    started_hour?: number,
    ended_hour?: number,
}