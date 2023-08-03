import { NotificationCreate, NotificationUpdate } from "../dto/notification";
import { ObjectState } from "@prisma/client";
import NotificationRepository from "../repositories/NotificationRepository";


const service = {
    search: async (params: any) => {
        return NotificationRepository.findAll();
    },
    getById: async (id: number) => {
        const notification = await NotificationRepository.findById(id);
        if (!notification) throw new Error("Không tìm thấy notification");
        return notification;
    },
    create: async (create: NotificationCreate) => {
        const notification: any = {
            id: 0,
            name: create.name,
            content: create.content,
            deep_link: create.deep_link,
        }
        return await NotificationRepository.save(notification);
    },
    update: async (update: NotificationUpdate) => {
        const notification: any = await service.getById(update.id);
        if(update.name) {
            notification.name = update.name;
        }
        if(update.content) {
            notification.content = update.content;
        }
        if(update.deep_link) {
            notification.deep_link = update.deep_link;
        }
        return await NotificationRepository.save(notification);
    },
    delete: async (id: number) => {
        const notification: any = await service.getById(id);
        notification.state = ObjectState.DELETED;
        return await NotificationRepository.save(notification);
    }

}

export default service;