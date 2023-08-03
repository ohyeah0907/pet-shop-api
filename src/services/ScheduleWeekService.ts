import ScheduleWeekRepository from "../repositories/ScheduleWeekRepository"
import { ScheduleWeekCreate, ScheduleWeekUpdate } from "../dto/schedule_week";
import { ObjectState } from "@prisma/client";
import scheduleService from "./RoleScheduleService";

const service = {
    search: async (params: any) => {
        return ScheduleWeekRepository.findAll();
    },
    getById: async (id: number) => {
        const scheduleWeek = await ScheduleWeekRepository.findById(id);
        if (!scheduleWeek) throw new Error("Không tìm thấy scheduleWeek");
        return scheduleWeek;
    },
    create: async (create: ScheduleWeekCreate) => {
        const schedule = await scheduleService.getById(create.schedule.id);
        const scheduleWeek: any = {
            id: 0,
            schedule_id: schedule.id,
            week_day: create.week_day,
            enable: create.enable,
            
        }
        return await ScheduleWeekRepository.save(scheduleWeek);
    },
    update: async (update: ScheduleWeekUpdate) => {
        const scheduleWeek: any = await service.getById(update.id);

        if(update.schedule) {
            const schedule = await scheduleService.getById(update.schedule.id);
            scheduleWeek.schedule_id = schedule.id;
        }
        if(update.week_day) {
            scheduleWeek.week_day = update.week_day;
        }
        if(update.enable) {
            scheduleWeek.enable = update.enable;
        }

        return await ScheduleWeekRepository.save(scheduleWeek);
    },
    delete: async (id: number) => {
        const scheduleWeek: any = await service.getById(id);
        scheduleWeek.state = ObjectState.DELETED;
        scheduleWeek.deleted_at = new Date();
        return !!(await ScheduleWeekRepository.save(scheduleWeek));
    }
}

export default service;