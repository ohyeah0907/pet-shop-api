import UserFCMRepository from "../repositories/UserFCMRepository"
import { UserFCMCreate, UserFCMUpdate } from "../dto/user_fcm";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return UserFCMRepository.findAll();
    },
    getById: async (id: number) => {
        const userFCM = await UserFCMRepository.findById(id);
        if (!userFCM) throw new Error("Không tìm thấy userFCM");
        return userFCM;
    },
    create: async (create: UserFCMCreate) => {
        const userFCM: any = {
            id: 0,
            device_name: create.device_name,
            app_name: create.app_name,
            subscribe_date: new Date(),
            fcm_subscribe_id: create.fcm_subscribe_id,
            other_info: create.other_info,
        }
        return await UserFCMRepository.save(userFCM);
    },
    update: async (update: UserFCMUpdate) => {
        const userFCM: any = await service.getById(update.id);

        if (update.device_name) userFCM.device_name = update.device_name;

        if (update.app_name) userFCM.app_name = update.app_name;

        if (update.status != null) userFCM.status = update.status;

        if (update.fcm_subscribe_id) userFCM.fcm_subscribe_id = update.fcm_subscribe_id;

        if (update.other_info) userFCM.other_info = update.other_info;

        if (update.subscribe_date) userFCM.subscribe_date = new Date(update.subscribe_date);


        return await UserFCMRepository.save(userFCM);
    },
    delete: async (id: number) => {
        const userFCM: any = await service.getById(id);
        userFCM.state = ObjectState.DELETED;
        userFCM.deleted_at = new Date();
        return !!(await UserFCMRepository.save(userFCM));
    }
}

export default service;