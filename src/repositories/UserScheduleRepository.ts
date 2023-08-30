import { UserSchedule, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const userSchedule = await prisma.userSchedule.findUnique({
        include: {
            user_home: true,
            schedule_weeks: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userSchedule;
}

const findAll = async () => {
    const userSchedules = await prisma.userSchedule.findMany({
        include: {
            user_home: true,
            schedule_weeks: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return userSchedules;
}
const save = async (userSchedule: UserSchedule) => {
    if (userSchedule.id) {
        return prisma.userSchedule.update({
            where: {
                id: userSchedule.id
            },
            data: {
                user_home: {
                    connect: {
                        id: userSchedule.user_home_id
                    }
                },
                started_at: userSchedule.started_at,
                ended_at: userSchedule.ended_at,
                state: userSchedule.state,
                deleted_at: userSchedule.deleted_at,
            },
            include: {
                user_home: true,
            }
        })
    }
    return prisma.userSchedule.create({
        data: {
            user_home: {
                connect: {
                    id: userSchedule.user_home_id
                }
            },
            started_at: userSchedule.started_at,
            ended_at: userSchedule.ended_at,
        },
        include: {
            user_home: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}