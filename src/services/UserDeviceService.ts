import { UserDeviceCreate, UserDeviceSearch, UserDeviceTableCheckUpdate, UserDeviceUpdate } from "../dto/user_device";
import { ObjectState } from "@prisma/client";
import UserDeviceRepository from "../repositories/UserDeviceRepository";
import roomDeviceService from "./RoomDeviceService"
import userService from "./UserService"
import prisma from "../prisma";
import device from "../schema/device";


const service = {
    search: async (search: UserDeviceSearch) => {
        return UserDeviceRepository.findAll(search);
    },
    getById: async (id: number) => {
        const userDevice = await UserDeviceRepository.findById(id);
        if (!userDevice) throw new Error("Không tìm thấy userDevice");
        return userDevice;
    },
    create: async (create: UserDeviceCreate) => {
        const user = await userService.getUserById(create.user.id);
        const device = await roomDeviceService.getById(create.device.id)
        const userDevice: any = {
            id: 0,
            user_id: user.id,
            device_id: device.id,
            is_favorite: false,
            enable: create.enable
        }
        return await UserDeviceRepository.save(userDevice);
    },
    update: async (update: UserDeviceUpdate) => {
        const userDevice: any = await service.getById(update.id);

        if (update.user) {
            const user = await userService.getUserById(update.user.id);
            userDevice.user_id = user.id
        }

        if (update.device) {
            const roomDevice = await roomDeviceService.getById(update.device.id)
            userDevice.device_id = roomDevice.id
        }

        if (update.is_favorite) {
            userDevice.is_favorite = update.is_favorite;
        }

        if (update.enable) {
            userDevice.enable = update.enable;
        }

        return await UserDeviceRepository.save(userDevice);
    },
    updateTableCheck: async (updates: UserDeviceTableCheckUpdate[]) => {
        return prisma.$transaction(async () => {
            updates.forEach(async (update) => {
                await service.disableAllByUserId(update.user_id)
                const user = await userService.getUserById(update.user_id);

                update.devices.forEach(async (device) => {
                    const userDevice = await UserDeviceRepository.findByUserIdAndRoomDeviceId(user.id, device.id)
                    if (!userDevice) {
                        const create: any = {
                            id: 0,
                            user_id: user.id,
                            enable: !!device.enable,
                            device_id: device.id,
                            is_favorite: false
                        }
                        await UserDeviceRepository.save(create);
                    } else {
                        if (device.enable != undefined) userDevice.enable = device.enable

                        await UserDeviceRepository.save(userDevice);
                    }
                })

            })
            return true
        })
    },

    delete: async (id: number) => {
        const userDevice: any = await service.getById(id);
        userDevice.state = ObjectState.DELETED;
        return await UserDeviceRepository.save(userDevice);
    },
    disableAllByUserId: async (userId: number) => {
        const search : any = {
            user: {
                id: userId
            }
        }
        const userDevices = await service.search(search)

        userDevices.forEach(async (userDevice) => {
            userDevice.enable = false
            await UserDeviceRepository.save(userDevice)
        })
    },

}

export default service;