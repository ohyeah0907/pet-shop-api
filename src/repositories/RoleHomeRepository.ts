import { RoleHome, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const roleHome = await prisma.roleHome.findUnique({
        include: {
            home: true,
            role: true,
            user_homes: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return roleHome;
}

const findAll = async () => {
    const roleHomes = await prisma.roleHome.findMany({
        include: {
            home: true,
            role: true,
            user_homes: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return roleHomes;
}
const save = async (roleHome: RoleHome) => {
    if (roleHome.id) {
        return prisma.roleHome.update({
            where: {
                id: roleHome.id
            },
            data: {
                role: {
                    connect: {
                        id: roleHome.role_id
                    }
                },
                home: {
                    connect: {
                        id: roleHome.home_id
                    }
                },
                state: roleHome.state,
                deleted_at: roleHome.deleted_at,
            },
            include: {
                home: true,
                role: true,
            }
        })
    }
    return prisma.roleHome.create({
        data: {
            role: {
                connect: {
                    id: roleHome.role_id
                }
            },
            home: {
                connect: {
                    id: roleHome.home_id
                }
            },
        },
        include: {
            home: true,
            role: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}