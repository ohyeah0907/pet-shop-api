import { UserNotificationCreate, UserNotificationUpdate } from "../dto/user_notification";
import { ObjectState } from "@prisma/client";
import UserNotificationRepository from "../repositories/UserNotificationRepository";
import notificationService from "./NotificationService";
import userService from "./UserService";


const service = {
    search: async (params: any) => {
        return UserNotificationRepository.findAll();
    },
    getById: async (id: number) => {
        const usernotification = await UserNotificationRepository.findById(id);
        if (!usernotification) throw new Error("Không tìm thấy usernotification");
        return usernotification;
    },
    create: async (create: UserNotificationCreate) => {
        const notification = await notificationService.getById(create.notification.id);
        const user = await userService.getUserById(create.user.id);
        const usernotification: any = {
            id: 0,
            notification_id: notification.id,
            user_id: user.id,
            is_sent: create.is_sent,
            sent_at: new Date(create.sent_at),
            is_viewed: create.is_viewed,
            viewed_at: new Date(create.viewed_at)
        }
        return await UserNotificationRepository.save(usernotification);
    },
    update: async (update: UserNotificationUpdate) => {
        const usernotification: any = await service.getById(update.id);
        if (update.notification) {
            const notification = await notificationService.getById(update.notification.id);
            usernotification.notification_id = notification.id;
        }
        if(update.user) {
            const user = await userService.getUserById(update.user.id);
            usernotification.user_id = user.id;
        }
        if(update.is_sent != null) {
            usernotification.is_sent = update.is_sent;
        }
        if(update.sent_at) {
            usernotification.sent_at = new Date(update.sent_at);
        }
        if(update.is_viewed != null) {
            usernotification.is_viewed = update.is_viewed;
        }
        if(update.viewed_at) {
            usernotification.viewed_at = new Date(update.viewed_at);
        }
        return await UserNotificationRepository.save(usernotification);
    },
    delete: async (id: number) => {
        const usernotification: any = await service.getById(id);
        usernotification.state = ObjectState.DELETED;
        return await UserNotificationRepository.save(usernotification);
    }

}

export default service;