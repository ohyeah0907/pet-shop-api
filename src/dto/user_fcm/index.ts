import { User } from "@prisma/client"

export type UserFCMCreate = {
    user: User,
    fcm_subscribe_id: string,
    device_name: string,
    app_name: string,
    other_info: string,
}

export type UserFCMUpdate = {
    id: number,
    user: User,
    fcm_subscribe_id: string,
    device_name: string,
    app_name: string,
    other_info: string,
    subscribe_date: Date,
    status: boolean,
}
