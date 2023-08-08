import RoleScheduleRepository from "../repositories/RoleScheduleRepository"
import { RoleScheduleCreate, RoleScheduleUpdate } from "../dto/role_schedule";
import { ObjectState } from "@prisma/client";
import roleHomeService from "./RoleHomeService";

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
        const roleHome = await roleHomeService.getById(create.role_home.id);
        const roleSchedule: any = {
            id: 0,
            role_home_id: roleHome.id,
            started_at: new Date(create.started_at),
            ended_at: new Date(create.ended_at),
        }
        return await RoleScheduleRepository.save(roleSchedule);
    },
    update: async (update: RoleScheduleUpdate) => {
        const roleSchedule: any = await service.getById(update.id);

        if(update.role_home) {
            const roleHome = await roleHomeService.getById(update.role_home.id);
            roleSchedule.role_home_id = roleHome.id;
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