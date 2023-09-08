import UserHomeRepository from "../repositories/UserHomeRepository"
import { UserHomeCreate, UserHomeScheduleCreate, UserHomeScheduleUpdate, UserHomeSearch, UserHomeUpdate } from "../dto/user_home";
import userService from "./UserService";
import homeService from "./HomeService";
import userScheduleService from "./UserScheduleService";
import scheduleWeekService from "./ScheduleWeekService";
import scheduleHourService from "./ScheduleHourService";
import prisma from "../prisma";
import { seperateArray } from "../utils";

const service = {
    search: async (search: UserHomeSearch) => {
        return await UserHomeRepository.findAll(search);
    },
    getById: async (id: number) => {
        const userHome = await UserHomeRepository.findById(id);
        if (!userHome) throw new Error("Không tìm thấy userHome");
        return userHome;
    },
    getByRoleHomeIdAndUserId: async (homeId: number, userId: number) => {
        const userHome = await UserHomeRepository.findByHomeIdAndUserId(homeId, userId);
        if (!userHome) throw new Error("Không tìm thấy userHome");
        return userHome;
    },
    create: async (create: UserHomeCreate) => {
        const user = await userService.getUserById(create.user.id);
        const userHome: any = {
            id: 0,
            home_id: create.home.id,
            user_id: user.id,
            ha_username: create.ha_username,
            ha_password: create.ha_password,
            lan_only: false,
            is_owner: false,
            ordering: 0,
        }
        return await UserHomeRepository.save(userHome);
    },
    createScheduleForUserHome: async (create: UserHomeScheduleCreate) => {
        return prisma.$transaction(async () => {
            const userSchedule = await userScheduleService.create({
                user_home: create.user_home,
                started_at: new Date(create.started_at),
                ended_at: new Date(create.ended_at),
            });

            create.days.forEach(async (day: any, index) => {
                const scheduleWeek = await scheduleWeekService.create({
                    schedule: userSchedule,
                    week_day: index,
                    enable: day.length > 0,
                });
                const hours = seperateArray(day);
                console.log(hours)
                hours.forEach(async (hour: any) => {
                    const scheduleHour = await scheduleHourService.create({
                        schedule_week: scheduleWeek,
                        started_hour: hour[0],
                        ended_hour: hour[hour.length - 1] + 1,
                    });
                });
            });

            return true
        });

    },
    update: async (update: UserHomeUpdate) => {
        const userHome: any = await service.getById(update.id);
        if (update.user) {
            const user = await userService.getUserById(update.user.id);
            userHome.user_id = user.id;
        }
        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            userHome.home_id = home.id;
        }
        if (update.ha_username) userHome.ha_username = update.ha_username;

        if (update.ha_password) userHome.ha_password = update.ha_password;

        if (update.lan_only != null) userHome.lan_only = update.lan_only;

        if (update.is_owner != null) userHome.is_owner = update.is_owner;

        if (update.ordering) userHome.ordering = update.ordering;


        return await UserHomeRepository.save(userHome);
    },
    updateScheduleForUserHome: async (update: UserHomeScheduleUpdate) => {
        return prisma.$transaction(async () => {
            const userSchedule = await userScheduleService.getById(update.id);

            await scheduleHourService.deleteByScheduleId(userSchedule.id);

            userSchedule.schedule_weeks.forEach(async (scheduleWeek: any, index: number) => {
                await scheduleWeekService.update({
                    id: scheduleWeek.id,
                    week_day: index,
                    schedule: userSchedule,
                    enable: update.days[index].length > 0,
                });
                const hours = seperateArray(update.days[index]);
                hours.forEach(async (hour: any) => {
                    await scheduleHourService.create({
                        schedule_week: scheduleWeek,
                        started_hour: hour[0],
                        ended_hour: hour[hour.length - 1] + 1,
                    });
                });
            });

            if (update.started_at) userSchedule.started_at = update.started_at;

            if (update.ended_at) userSchedule.ended_at = update.ended_at;

            return !!await userScheduleService.update(userSchedule);
        })
    },
    delete: async (id: number) => {
        const userHome: any = await service.getById(id);
        return !!(await UserHomeRepository.deleteById(userHome.id));
    },
}

export default service;