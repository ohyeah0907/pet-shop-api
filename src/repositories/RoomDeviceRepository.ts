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

const findByRoomIdAndDeviceId = async (roomId: number, deviceId: number) => {
    const roomDevice = await prisma.roomDevice.findFirst({
        include: {
            device: true,
            room: true,
        },
        where: {
            room_id: roomId,
            device_id: deviceId,
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
        },
        orderBy: {
            ordering: 'asc'
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
            longitude: roomDevice.longitude,
            ordering: roomDevice.ordering,
        },
        include: {
            device: true,
            room: true,
        }
    })
}

const deleteAllByRoomId = async (roomId: number) => {
    return prisma.roomDevice.deleteMany({
        where: {
            room_id: roomId
        }
    })
}

export default {
    save,
    findById,
    findByRoomIdAndDeviceId,
    findAll,
    deleteAllByRoomId,
}