import ScheduleHourRepository from "../repositories/ScheduleHourRepository"
import { ScheduleHourCreate, ScheduleHourUpdate } from "../dto/schedule_hour";
import { ObjectState } from "@prisma/client";
import scheduleWeekService from "./ScheduleWeekService";

const service = {
    search: async (params: any) => {
        return ScheduleHourRepository.findAll();
    },
    getById: async (id: number) => {
        const scheduleHour = await ScheduleHourRepository.findById(id);
        if (!scheduleHour) throw new Error("Không tìm thấy scheduleHour");
        return scheduleHour;
    },
    create: async (create: ScheduleHourCreate) => {
        const scheduleWeek = await scheduleWeekService.getById(create.schedule_week.id);
        const scheduleHour: any = {
            id: 0,
            schedule_week_id: scheduleWeek.id,
            started_hour: create.started_hour,
            ended_hour: create.ended_hour,
        }
        return await ScheduleHourRepository.save(scheduleHour);
    },
    update: async (update: ScheduleHourUpdate) => {
        const scheduleHour: any = await service.getById(update.id);

        if (update.schedule_week) {
            const scheduleWeek = await scheduleWeekService.getById(update.schedule_week.id);
            scheduleHour.schedule_week_id = scheduleWeek.id;
        }
        if (update.started_hour) {
            scheduleHour.started_hour = update.started_hour;
        }
        if (update.ended_hour) {
            scheduleHour.ended_hour = update.ended_hour;
        }

        return await ScheduleHourRepository.save(scheduleHour);
    },
    delete: async (id: number) => {
        const scheduleHour: any = await service.getById(id);
        scheduleHour.state = ObjectState.DELETED;
        scheduleHour.deleted_at = new Date();
        return !!(await ScheduleHourRepository.save(scheduleHour));
    },
    deleteByScheduleId: async (scheduleId: number) => {
        return await ScheduleHourRepository.deleteByScheduleId(scheduleId);
    }
}

export default service;