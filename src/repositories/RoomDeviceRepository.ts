import { RoomDevice, ObjectState } from "@prisma/client";
import prisma from "../prisma";
import { RoomDeviceSearch } from "../dto/room_device";
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
        }
    });
    return roomDevice;
}

const findAll = async (search: RoomDeviceSearch) => {
    let condition: any = {
        NOT: {
            state: ObjectState.DELETED,
        }
    }

    if (search.room) condition.room_id = search.room.id

    if (search.device) condition.device_id = search.device.id

    if (search.home) condition = {
        ...condition,
        room: {
            home_id: search.home.id
        },
        device: {
            home_id: search.home.id
        }
    }

    const roomDevices = await prisma.roomDevice.findMany({
        include: {
            device: {
                include: {
                    user_devices: {
                        include: {
                            user: true
                        }
                    }
                }
            },
            room: true,
        },
        where: condition,
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
                is_clone: roomDevice.is_clone,
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
            is_clone: roomDevice.is_clone,
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