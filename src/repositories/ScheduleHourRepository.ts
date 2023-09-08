import { ScheduleHour, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const scheduleHour = await prisma.scheduleHour.findUnique({
        include: {
            schedule_week: true,
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
            schedule_week: true,
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
                schedule_week: {
                    connect: {
                        id: scheduleHour.schedule_week_id
                    }
                },
                started_hour: scheduleHour.started_hour,
                ended_hour: scheduleHour.ended_hour,
                state: scheduleHour.state,
                deleted_at: scheduleHour.deleted_at,
            },
            include: {
                schedule_week: true,
            }
        })
    }
    return prisma.scheduleHour.create({
        data: {
            schedule_week: {
                connect: {
                    id: scheduleHour.schedule_week_id
                }
            },
            started_hour: scheduleHour.started_hour,
            ended_hour: scheduleHour.ended_hour,
        },
        include: {
            schedule_week: true,
        }
    })
}

const deleteByScheduleId = async (scheduleId: number) => {
    return prisma.scheduleHour.deleteMany({
        where: {
            schedule_week: {
                schedule_id: scheduleId
            }
        }
    })
}

export default {
    save,
    findById,
    findAll,
    deleteByScheduleId,
}