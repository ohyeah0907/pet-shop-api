import { RoomDevice, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const roomDevice = await prisma.roomDevice.findUnique({
        include: {
            device: true,
            room: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return roomDevice;
}

const findAll = async () => {
    const roomDevices = await prisma.roomDevice.findMany({
        include: {
            device: true,
            room: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return roomDevices;
}
const save = async (roomDevice: RoomDevice) => {
    if (roomDevice.id) {
        return prisma.roomDevice.update({
            where: {
                id: roomDevice.id
            },
            data: {
                room: {
                    connect: {
                        id: roomDevice.room_id
                    }
                },
                device: {
                    connect: {
                        id: roomDevice.device_id
                    }
                },
                longitude: roomDevice.longitude,
                latitude: roomDevice.latitude,
                ordering: roomDevice.ordering,
                is_favorite: roomDevice.is_favorite,
                state: roomDevice.state,
                deleted_at: roomDevice.deleted_at,
            },
            include: {
                device: true,
                room: true,
            }
        })
    }
    return prisma.roomDevice.create({
        data: {
            room: {
                connect: {
                    id: roomDevice.room_id
                }
            },
            device: {
                connect: {
                    id: roomDevice.device_id
                }
            },
            latitude: roomDevice.latitude,
            longitude : roomDevice.longitude,
            is_favorite: roomDevice.is_favorite,
            ordering: roomDevice.ordering,
        },
        include: {
            device: true,
            room: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}