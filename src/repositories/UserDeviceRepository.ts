import { UserDeviceSearch } from "../dto/user_device";
import prisma from "../prisma"
import { UserDevice, ObjectState } from "@prisma/client";


const findAll = async (search: UserDeviceSearch) => {
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

    if (search.device)
        condition["device_id"] = search.device.id

    const userDevices = await prisma.userDevice.findMany({
        where: condition
    });

    return userDevices;
}

const findById = async (id: number) => {
    const userDevice = await prisma.userDevice.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userDevice;
}
const findByUserIdAndRoomDeviceId = async (userId: number, roomDeviceId: number) => {
    const userDevice = await prisma.userDevice.findFirst({
        where: {
            user_id: userId,
            device_id: roomDeviceId,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userDevice;
}

const save = async (userDevice: UserDevice) => {

    if (userDevice.id) {
        return await prisma.userDevice.update({
            where: {
                id: userDevice.id
            },
            data: {
                device: {
                    connect: {
                        id: userDevice.device_id
                    }
                },
                user: {
                    connect: {
                        id: userDevice.user_id
                    }
                },
                enable: userDevice.enable,
                is_favorite: userDevice.is_favorite,
                state: userDevice.state,
                deleted_at: userDevice.deleted_at,
                updated_at: userDevice.updated_at,
            },
        });
    }
    return await prisma.userDevice.create({
        data: {
            device: {
                connect: {
                    id: userDevice.device_id
                }
            },
            user: {
                connect: {
                    id: userDevice.user_id
                }
            },
            enable: userDevice.enable,
            is_favorite: userDevice.is_favorite,
        },
    });

}

export default {
    findAll,
    findById,
    findByUserIdAndRoomDeviceId,
    save
}