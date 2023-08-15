import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { UserNotification, ObjectState } from "@prisma/client";


const findAll = async () => {
    const userNotifications = await prisma.userNotification.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        },
        include: {
            user_fcm: true,
            notification: true,
        }
    });
    return userNotifications;
}

const findById = async (id: number) => {
    const userNotification = await prisma.userNotification.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            user_fcm: true,
            notification: true,
        }
    });
    return userNotification;
}

const save = async (userNotification: UserNotification) => {
    if (userNotification.id) {
        return await prisma.userNotification.update({
            where: {
                id: userNotification.id
            },
            data: {
                user_fcm: {
                    connect: {
                        id: userNotification.user_fcm_id
                    }
                },
                notification: {
                    connect: {
                        id: userNotification.notification_id
                    }
                },
                is_sent: userNotification.is_sent,
                sent_at: userNotification.sent_at,
                is_viewed: userNotification.is_viewed,
                viewed_at: userNotification.viewed_at,
                state: userNotification.state,
                deleted_at: userNotification.deleted_at,
                updated_at: userNotification.updated_at,
            },
            include: {
                user_fcm: true,
                notification: true,
            }
        });
    }
    return await prisma.userNotification.create({
        data: {
            user_fcm: {
                connect: {
                    id: userNotification.user_fcm_id
                }
            },
            notification: {
                connect: {
                    id: userNotification.notification_id
                }
            },
            is_sent: userNotification.is_sent,
            sent_at: userNotification.sent_at,
            is_viewed: userNotification.is_viewed,
            viewed_at: userNotification.viewed_at,
        },
        include: {
            user_fcm: true,
            notification: true,
        }
    });

}

export default {
    findAll,
    findById,
    save
}