import { Notification, User, UserFCM } from "@prisma/client";

export type UserNotificationCreate = {
    user_fcm: UserFCM,
    notification: Notification,
    is_sent: boolean,
    sent_at: Date,
    is_viewed: boolean,
    viewed_at: Date,
}

export type UserNotificationUpdate = {
    id: number,
    user_fcm: UserFCM,
    notification: Notification,
    is_sent: boolean,
    sent_at: Date,
    is_viewed: boolean,
    viewed_at: Date,
}