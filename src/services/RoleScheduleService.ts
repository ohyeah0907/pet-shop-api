import RoleScheduleRepository from "../repositories/RoleScheduleRepository"
import { RoleScheduleCreate, RoleScheduleUpdate } from "../dto/role_schedule";
import { ObjectState } from "@prisma/client";
import roleHouseService from "./RoleHouseService";

const service = {
    search: async (params: any) => {
        return RoleScheduleRepository.findAll();
    },
    getById: async (id: number) => {
        const roleSchedule = await RoleScheduleRepository.findById(id);
        if (!roleSchedule) throw new Error("Không tìm thấy roleSchedule");
        return roleSchedule;
    },
    create: async (create: RoleScheduleCreate) => {
        const roleHouse = await roleHouseService.getById(create.role_house.id);
        const roleSchedule: any = {
            id: 0,
            role_house_id: roleHouse.id,
            started_at: new Date(create.started_at),
            ended_at: new Date(create.ended_at),
        }
        return await RoleScheduleRepository.save(roleSchedule);
    },
    update: async (update: RoleScheduleUpdate) => {
        const roleSchedule: any = await service.getById(update.id);

        if(update.role_house) {
            const roleHouse = await roleHouseService.getById(update.role_house.id);
            roleSchedule.role_house_id = roleHouse.id;
        }
        if(update.started_at) {
            roleSchedule.started_at = new Date(update.started_at);
        }
        if(update.ended_at) {
            roleSchedule.ended_at = new Date(update.ended_at);
        }
        
        return await RoleScheduleRepository.save(roleSchedule);
    },
    delete: async (id: number) => {
        const roleSchedule: any = await service.getById(id);
        roleSchedule.state = ObjectState.DELETED;
        roleSchedule.deleted_at = new Date();
        return !!(await RoleScheduleRepository.save(roleSchedule));
    }
}

export default service;