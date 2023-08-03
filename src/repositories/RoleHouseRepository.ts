import { RoleHouse, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const roleHouse = await prisma.roleHouse.findUnique({
        include: {
            house: true,
            role: true,
            user_houses: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return roleHouse;
}

const findAll = async () => {
    const roleHouses = await prisma.roleHouse.findMany({
        include: {
            house: true,
            role: true,
            user_houses: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return roleHouses;
}
const save = async (roleHouse: RoleHouse) => {
    if (roleHouse.id) {
        return prisma.roleHouse.update({
            where: {
                id: roleHouse.id
            },
            data: {
                role: {
                    connect: {
                        id: roleHouse.role_id
                    }
                },
                house: {
                    connect: {
                        id: roleHouse.house_id
                    }
                },
                state: roleHouse.state,
                deleted_at: roleHouse.deleted_at,
            },
            include: {
                house: true,
                role: true,
            }
        })
    }
    return prisma.roleHouse.create({
        data: {
            role: {
                connect: {
                    id: roleHouse.role_id
                }
            },
            house: {
                connect: {
                    id: roleHouse.house_id
                }
            },
        },
        include: {
            house: true,
            role: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}