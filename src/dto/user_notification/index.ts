import { Notification, User } from "@prisma/client";

export type UserNotificationCreate = {
    user: User,
    notification: Notification,
    is_sent: boolean,
    sent_at: Date,
    is_viewed: boolean,
    viewed_at: Date,
}

export type UserNotificationUpdate = {
    id: number,
    user: User,
    notification: Notification,
    is_sent: boolean,
    sent_at: Date,
    is_viewed: boolean,
    viewed_at: Date,
}