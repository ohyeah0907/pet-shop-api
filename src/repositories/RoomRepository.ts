import { Room, ObjectState } from "@prisma/client";
import prisma from "../prisma";
import { RoomSearch } from "../dto/room";
const findById = async (id: number) => {
    const room = await prisma.room.findUnique({
        include: {
            home: true,
            // parent: true,
            user: true,
            // children: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return room;
}

const findAll = async (search: RoomSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        }
    }
    if (search.home) {
        condition.home_id = search.home.id;
    }
    if (search.user) {
        condition.user_id = search.user.id;
    }
    const rooms = await prisma.room.findMany({
        include: {
            home: true,
            // parent: true,
            user: true,
            // children: {
            //     where: {
            //         NOT: {
            //             state: ObjectState.DELETED
            //         }
            //     }
            // },
        },
        where: {
            ...condition
        }
    });
    return rooms;
}
const save = async (room: Room) => {
    if (room.id) {
        // await prisma.room.update({
        //     where: {
        //         id: room.id
        //     },
        //     data: {
        //         parent_id: room.parent_id
        //     },
        //     include: {
        //         home: true,
        //         // parent: true,
        //         user: true,
        //     }
        // })
        return prisma.room.update({
            where: {
                id: room.id
            },
            data: {
                name: room.name,
                image_url: room.image_url,
                ordering: room.ordering,
                home: {
                    connect: {
                        id: room.home_id
                    }
                },
                user: {
                    connect: {
                        id: room.user_id
                    }
                },
                is_home: room.is_home,
                state: room.state,
                deleted_at: room.deleted_at,
            },
            include: {
                home: true,
                // parent: true,
                user: true,
            }
        })

    }
    return prisma.room.create({
        data: {
            name: room.name,
            image_url: room.image_url,
            ordering: room.ordering,
            home: {
                connect: {
                    id: room.home_id
                }
            },
            // parent: room.parent_id ? {
            //     connect: {
            //         id: room.parent_id
            //     }
            // } : undefined,
            user: {
                connect: {
                    id: room.user_id
                }
            },
            is_home: room.is_home,
        },
        include: {
            home: true,
            // parent: true,
            user: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}