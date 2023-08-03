import { ScheduleHour, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const scheduleHour = await prisma.scheduleHour.findUnique({
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
    return scheduleHour;
}

const findAll = async () => {
    const scheduleHours = await prisma.scheduleHour.findMany({
        include: {
            schedule: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return scheduleHours;
}
const save = async (scheduleHour: ScheduleHour) => {
    if (scheduleHour.id) {
        return prisma.scheduleHour.update({
            where: {
                id: scheduleHour.id
            },
            data: {
                schedule: {
                    connect: {
                        id: scheduleHour.schedule_id
                    }
                },
                started_hour: scheduleHour.started_hour,
                ended_hour: scheduleHour.ended_hour,
                state: scheduleHour.state,
                deleted_at: scheduleHour.deleted_at,
            },
            include: {
                schedule: true,
            }
        })
    }
    return prisma.scheduleHour.create({
        data: {
            schedule: {
                connect: {
                    id: scheduleHour.schedule_id
                }
            },
            started_hour: scheduleHour.started_hour,
            ended_hour: scheduleHour.ended_hour,
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