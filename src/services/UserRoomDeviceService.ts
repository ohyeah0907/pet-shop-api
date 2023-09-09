import { UserRoomDeviceCreate, UserRoomDeviceSearch, UserRoomDeviceTableCheckUpdate, UserRoomDeviceUpdate } from "../dto/user_room_device";
import { ObjectState } from "@prisma/client";
import UserRoomDeviceRepository from "../repositories/UserRoomDeviceRepository";
import roomDeviceService from "../services/RoomDeviceService"
import userService from "../services/UserService"
import prisma from "../prisma";
import room_device from "../schema/room_device";


const service = {
    search: async (search: UserRoomDeviceSearch) => {
        return UserRoomDeviceRepository.findAll(search);
    },
    getById: async (id: number) => {
        const userRoomDevice = await UserRoomDeviceRepository.findById(id);
        if (!userRoomDevice) throw new Error("Không tìm thấy userRoomDevice");
        return userRoomDevice;
    },
    create: async (create: UserRoomDeviceCreate) => {
        const user = await userService.getUserById(create.user.id);
        const roomDevice = await roomDeviceService.getById(create.room_device.id)
        const userRoomDevice: any = {
            id: 0,
            user_id: user.id,
            room_device_id: roomDevice.id,
            is_favorite: false,
            enable: create.enable
        }
        return await UserRoomDeviceRepository.save(userRoomDevice);
    },
    update: async (update: UserRoomDeviceUpdate) => {
        const userRoomDevice: any = await service.getById(update.id);

        if (update.user) {
            const user = await userService.getUserById(update.user.id);
            userRoomDevice.user_id = user.id
        }

        if (update.room_device) {
            const roomDevice = await roomDeviceService.getById(update.room_device.id)
            userRoomDevice.room_device_id = roomDevice.id
        }

        if (update.is_favorite) {
            userRoomDevice.is_favorite = update.is_favorite;
        }

        if (update.enable) {
            userRoomDevice.enable = update.enable;
        }

        return await UserRoomDeviceRepository.save(userRoomDevice);
    },
    updateTableCheck: async (updates: UserRoomDeviceTableCheckUpdate[]) => {
        return prisma.$transaction(async () => {
            updates.forEach(async (update) => {
                const user = await userService.getUserById(update.user_id);

                update.room_devices.forEach(async (room_device) => {
                    const userRoomDevice = await UserRoomDeviceRepository.findByUserIdAndRoomDeviceId(user.id, room_device.id)
                    if (!userRoomDevice) {
                        const create: any = {
                            id: 0,
                            user_id: user.id,
                            enable: room_device.enable,
                            room_device_id: room_device.id,
                            is_favorite: false
                        }
                        await UserRoomDeviceRepository.save(create);
                    } else {
                        if (userRoomDevice.enable) userRoomDevice.enable = room_device.enable
                        await UserRoomDeviceRepository.save(userRoomDevice);
                    }
                })

                return true
            })
        })
    },

    delete: async (id: number) => {
        const userRoomDevice: any = await service.getById(id);
        userRoomDevice.state = ObjectState.DELETED;
        return await UserRoomDeviceRepository.save(userRoomDevice);
    }

}

export default service;