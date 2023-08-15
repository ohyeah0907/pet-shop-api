import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { RoomShortcut, ObjectState, DeviceType } from "@prisma/client";


const findAll = async () => {
    const roomShortcuts = await prisma.roomShortcut.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }, include: {
            room: true,
            room_other: true
        }
    });
    return roomShortcuts;
}

const findById = async (id: number) => {
    const roomShortcut = await prisma.roomShortcut.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }, include: {
            room: true,
            room_other: true
        }
    });
    return roomShortcut;
}

const save = async (roomShortcut: RoomShortcut) => {

    if (roomShortcut.id) {
        return await prisma.roomShortcut.update({
            where: {
                id: roomShortcut.id
            },
            data: {
                room: {
                    connect: {
                        id: roomShortcut.room_id
                    }
                },
                room_other: {
                    connect: {
                        id: roomShortcut.room_other_id
                    }
                },
                longitude: roomShortcut.longitude,
                latitude: roomShortcut.latitude,
                state: roomShortcut.state,
                deleted_at: roomShortcut.deleted_at,
            },
            include: {
                room: true,
                room_other: true
            }

        });
    }
    return await prisma.roomShortcut.create({
        data: {
            room: {
                connect: {
                    id: roomShortcut.room_id
                }
            },
            room_other: {
                connect: {
                    id: roomShortcut.room_other_id
                }
            },
            longitude: roomShortcut.longitude,
            latitude: roomShortcut.latitude,
        },
        include: {
            room: true,
            room_other: true
        }
    });

}

export default {
    findAll,
    findById,
    save
}