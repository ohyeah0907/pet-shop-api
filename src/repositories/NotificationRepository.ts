import prisma from "../prisma"
import { Notification, ObjectState } from "@prisma/client";


const findAll = async () => {
    const notifications = await prisma.notification.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return notifications;
}

const findById = async (id: number) => {
    const notification = await prisma.notification.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return notification;
}

const save = async (notification: Notification) => {

    if (notification.id) {
        return await prisma.notification.update({
            where: {
                id: notification.id
            },
            data: {
                name: notification.name,
                content: notification.content,
                deep_link: notification.deep_link,
                state: notification.state,
                deleted_at: notification.deleted_at,
                updated_at: notification.updated_at,
            },
        });
    }
    return await prisma.notification.create({
        data: {
            name: notification.name,
            content: notification.content,
            deep_link: notification.deep_link,
        },
    });

}

export default {
    findAll,
    findById,
    save
}