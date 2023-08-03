import { ScheduleWeek, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const scheduleWeek = await prisma.scheduleWeek.findUnique({
        include: {
            schedule: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return scheduleWeek;
}

const findAll = async () => {
    const scheduleWeeks = await prisma.scheduleWeek.findMany({
        include: {
            schedule: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return scheduleWeeks;
}
const save = async (scheduleWeek: ScheduleWeek) => {
    if (scheduleWeek.id) {
        return prisma.scheduleWeek.update({
            where: {
                id: scheduleWeek.id
            },
            data: {
                schedule: {
                    connect: {
                        id: scheduleWeek.schedule_id
                    }
                },
                week_day: scheduleWeek.week_day,
                enable: scheduleWeek.enable,
                state: scheduleWeek.state,
                deleted_at: scheduleWeek.deleted_at,
            },
            include: {
                schedule: true,
            }
        })
    }
    return prisma.scheduleWeek.create({
        data: {
            schedule: {
                connect: {
                    id: scheduleWeek.schedule_id
                }
            },
            week_day: scheduleWeek.week_day,
            enable: scheduleWeek.enable,
        },
        include: {
            schedule: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}