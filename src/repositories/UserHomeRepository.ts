import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { UserHome, ObjectState } from "@prisma/client";
import { UserHomeSearch } from "../dto/user_home";


const findAll = async (search: UserHomeSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        },
    }
    if (search.home?.id) {
        condition['role_home'] = {
            home_id: search.home?.id
        }
    }
    if (search.user?.id) {
        condition['user_id'] = search.user?.id
    }
    const userHomes = await prisma.userHome.findMany({
        include: {
            user: true,
            home: true,
        },
        where: condition,
        orderBy: {
            id: "asc"
        }
    });
    return userHomes;
}

const findById = async (id: number) => {
    const userHome = await prisma.userHome.findUnique({
        include: {
            user: true,
            home: true
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

const findByHomeIdAndUserId = async (homeId: number, userId: number) => {
    const userHome = await prisma.userHome.findUnique({
        include: {
            user: true,
            home: true
        },
        where: {
            home_id: homeId,
            user_id: userId,
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
                home: {
                    connect: {
                        id: userHome.home_id
                    }
                },
                lan_only: userHome.lan_only,
                ha_password: userHome.ha_password,
                ha_username: userHome.ha_username,
                ordering: userHome.ordering,
                state: userHome.state,
                deleted_at: userHome.deleted_at,
                updated_at: userHome.updated_at,
            },
            include: {
                user: true,
                home: true,
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
            home: {
                connect: {
                    id: userHome.home_id
                }
            },
            ha_username: userHome.ha_username,
            ha_password: userHome.ha_password,
            lan_only: userHome.lan_only,
            is_owner: userHome.is_owner,
            ordering: userHome.ordering,
        },
        include: {
            user: true,
            home: true,
        }
    });

}

const deleteById = async (id: number) => {
    return prisma.userHome.delete({
        where: {
            id: id
        },
    });
}
export default {
    findAll,
    findById,
    findByHomeIdAndUserId,
    save,
    deleteById
}