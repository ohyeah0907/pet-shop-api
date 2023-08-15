import { Room, ObjectState } from "@prisma/client";
import prisma from "../prisma";
import { RoomSearch } from "../dto/room";
const findById = async (id: number) => {
    const room = await prisma.room.findUnique({
        include: {
            home: true,
            user: true,
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
            user: true,
        },
        where: {
            ...condition
        }
    });
    return rooms;
}
const save = async (room: Room) => {
    if (room.id) {
        return prisma.room.update({
            where: {
                id: room.id
            },
            data: {
                name: room.name,
                thumb_image: room.thumb_image,
                panorama_image: room.panorama_image,
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
                user: true,
            }
        })

    }
    return prisma.room.create({
        data: {
            name: room.name,
            thumb_image: room.thumb_image,
            panorama_image: room.panorama_image,
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
        },
        include: {
            home: true,
            user: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}