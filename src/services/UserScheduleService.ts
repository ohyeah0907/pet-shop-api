import UserScheduleRepository from "../repositories/UserScheduleRepository"
import { UserScheduleCreate, UserScheduleUpdate } from "../dto/user_schedule";
import { ObjectState } from "@prisma/client";
import userHomeService from "./UserHomeService";

const service = {
    search: async (params: any) => {
        return UserScheduleRepository.findAll();
    },
    getById: async (id: number) => {
        const userSchedule = await UserScheduleRepository.findById(id);
        if (!userSchedule) throw new Error("Không tìm thấy userSchedule");
        return userSchedule;
    },
    create: async (create: UserScheduleCreate) => {
        const userHome = await userHomeService.getById(create.user_home.id);
        const userSchedule: any = {
            id: 0,
            user_home_id: userHome.id,
            started_at: new Date(create.started_at),
            ended_at: new Date(create.ended_at),
        }
        return await UserScheduleRepository.save(userSchedule);
    },
    update: async (update: UserScheduleUpdate) => {
        const userSchedule: any = await service.getById(update.id);

        if(update.user_home) {
            const userHome = await userHomeService.getById(update.user_home.id);
            userSchedule.user_home_id = userHome.id;
        }
        if(update.started_at) {
            userSchedule.started_at = new Date(update.started_at);
        }
        if(update.ended_at) {
            userSchedule.ended_at = new Date(update.ended_at);
        }
        
        return await UserScheduleRepository.save(userSchedule);
    },
    delete: async (id: number) => {
        const userSchedule: any = await service.getById(id);
        userSchedule.state = ObjectState.DELETED;
        userSchedule.deleted_at = new Date();
        return !!(await UserScheduleRepository.save(userSchedule));
    }
}

export default service;