import { User, UserHome } from "@prisma/client"

export type UserScheduleCreate = {
    user_home: UserHome,
    started_at: Date,
    ended_at: Date,
}

export type UserScheduleUpdate = {
    id: number,
    user_home: UserHome,
    started_at: Date,
    ended_at: Date,
}