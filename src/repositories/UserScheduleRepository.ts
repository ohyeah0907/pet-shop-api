import { UserSchedule, ObjectState } from "@prisma/client";
import prisma from "../prisma";
import { UserScheduleSearch } from "../dto/user_schedule";
const findById = async (id: number) => {
    const userSchedule = await prisma.userSchedule.findUnique({
        include: {
            user_home: true,
            schedule_weeks: {
                include: {
                    schedule_hours: {
                        orderBy: {
                            started_hour: 'asc',
                        }
                    },
                },
                orderBy: {
                    week_day: 'asc',
                }
            },
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

const findAll = async (search: UserScheduleSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        },
    }

    if (search.user_home?.id) {
        condition['user_home_id'] = search.user_home?.id
    }

    const userSchedules = await prisma.userSchedule.findMany({
        include: {
            user_home: true,
            schedule_weeks: {
                include: {
                    schedule_hours: true,
                },
                orderBy: {
                    week_day: 'asc',
                }
            },
        },
        where: condition,
        orderBy: {
            id: 'asc',
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