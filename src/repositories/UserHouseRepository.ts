import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { UserHouse, ObjectState } from "@prisma/client";


const findAll = async () => {
    const userHouses = await prisma.userHouse.findMany({
        include: {
            user: true,
            role_house: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userHouses;
}

const findById = async (id: number) => {
    const userHouse = await prisma.userHouse.findUnique({
        include: {
            user: true,
            role_house: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }

    });
    return userHouse;
}

const save = async (userHouse: UserHouse) => {
    if (userHouse.id) {
        return await prisma.userHouse.update({
            where: {
                id: userHouse.id
            },
            data: {
                user: {
                    connect: {
                        id: userHouse.user_id
                    }
                },
                role_house: {
                    connect: {
                        id: userHouse.role_house_id
                    }
                },
                ordering: userHouse.ordering,
                state: userHouse.state,
                deleted_at: userHouse.deleted_at,
                updated_at: userHouse.updated_at,
            },
            include: {
                user: true,
                role_house: true,
            }
        });
    }
    return await prisma.userHouse.create({
        data: {
            user: {
                connect: {
                    id: userHouse.user_id
                }
            },
            role_house: {
                connect: {
                    id: userHouse.role_house_id
                }
            },
            ha_username: userHouse.ha_username,
            ha_password: userHouse.ha_password,
            ordering: userHouse.ordering,
        },
        include: {
            user: true,
            role_house: true,
        }
    });

}

export default {
    findAll,
    findById,
    save
}