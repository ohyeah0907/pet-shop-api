import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { UserHome, ObjectState } from "@prisma/client";


const findAll = async () => {
    const userHomes = await prisma.userHome.findMany({
        include: {
            user: true,
            role_home: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userHomes;
}

const findById = async (id: number) => {
    const userHome = await prisma.userHome.findUnique({
        include: {
            user: true,
            role_home: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }

    });
    return userHome;
}

const save = async (userHome: UserHome) => {
    if (userHome.id) {
        return await prisma.userHome.update({
            where: {
                id: userHome.id
            },
            data: {
                user: {
                    connect: {
                        id: userHome.user_id
                    }
                },
                role_home: {
                    connect: {
                        id: userHome.role_home_id
                    }
                },
                ordering: userHome.ordering,
                state: userHome.state,
                deleted_at: userHome.deleted_at,
                updated_at: userHome.updated_at,
            },
            include: {
                user: true,
                role_home: true,
            }
        });
    }
    return await prisma.userHome.create({
        data: {
            user: {
                connect: {
                    id: userHome.user_id
                }
            },
            role_home: {
                connect: {
                    id: userHome.role_home_id
                }
            },
            ha_username: userHome.ha_username,
            ha_password: userHome.ha_password,
            ordering: userHome.ordering,
        },
        include: {
            user: true,
            role_home: true,
        }
    });

}

export default {
    findAll,
    findById,
    save
}