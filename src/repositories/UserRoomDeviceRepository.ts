import { UserRoomDeviceSearch } from "../dto/user_room_device";
import prisma from "../prisma"
import { UserRoomDevice, ObjectState } from "@prisma/client";


const findAll = async (search: UserRoomDeviceSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        }
    }
    if (search.home) {
        condition["user"] = {
            user_homes: {
                some: {
                    home: {
                        id: search.home.id
                    }
                }
            }
        }
    }
    if (search.user)
        condition["user_id"] = search.user.id

    if (search.room_device)
        condition["room_device_id"] = search.room_device.id

    const userRoomDevices = await prisma.userRoomDevice.findMany({
        where: {
        }
    });

    return userRoomDevices;
}

const findById = async (id: number) => {
    const userRoomDevice = await prisma.userRoomDevice.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userRoomDevice;
}
const findByUserIdAndRoomDeviceId = async (userId: number, roomDeviceId: number) => {
    const userRoomDevice = await prisma.userRoomDevice.findFirst({
        where: {
            user_id: userId,
            room_device_id: roomDeviceId,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userRoomDevice;
}

const save = async (userRoomDevice: UserRoomDevice) => {

    if (userRoomDevice.id) {
        return await prisma.userRoomDevice.update({
            where: {
                id: userRoomDevice.id
            },
            data: {
                room_device: {
                    connect: {
                        id: userRoomDevice.room_device_id
                    }
                },
                user: {
                    connect: {
                        id: userRoomDevice.user_id
                    }
                },
                enable: userRoomDevice.enable,
                is_favorite: userRoomDevice.is_favorite,
                state: userRoomDevice.state,
                deleted_at: userRoomDevice.deleted_at,
                updated_at: userRoomDevice.updated_at,
            },
        });
    }
    return await prisma.userRoomDevice.create({
        data: {
            room_device: {
                connect: {
                    id: userRoomDevice.room_device_id
                }
            },
            user: {
                connect: {
                    id: userRoomDevice.user_id
                }
            },
            enable: userRoomDevice.enable,
            is_favorite: userRoomDevice.is_favorite,
        },
    });

}

export default {
    findAll,
    findById,
    findByUserIdAndRoomDeviceId,
    save
}