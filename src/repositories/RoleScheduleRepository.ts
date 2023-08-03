import { RoleSchedule, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const roleSchedule = await prisma.roleSchedule.findUnique({
        include: {
            role_house: true,
            schedule_weeks: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return roleSchedule;
}

const findAll = async () => {
    const roleSchedules = await prisma.roleSchedule.findMany({
        include: {
            role_house: true,
            schedule_weeks: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return roleSchedules;
}
const save = async (roleSchedule: RoleSchedule) => {
    if (roleSchedule.id) {
        return prisma.roleSchedule.update({
            where: {
                id: roleSchedule.id
            },
            data: {
                role_house: {
                    connect: {
                        id: roleSchedule.role_house_id
                    }
                },
                started_at: roleSchedule.started_at,
                ended_at: roleSchedule.ended_at,
                state: roleSchedule.state,
                deleted_at: roleSchedule.deleted_at,
            },
            include: {
                role_house: true,
            }
        })
    }
    return prisma.roleSchedule.create({
        data: {
            role_house: {
                connect: {
                    id: roleSchedule.role_house_id
                }
            },
            started_at: roleSchedule.started_at,
            ended_at: roleSchedule.ended_at,
        },
        include: {
            role_house: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}