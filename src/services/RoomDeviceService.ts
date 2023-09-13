import { RoomDevice } from "@prisma/client";
import { BadRequestResponse, NotFoundResponse } from "../handler/app-response";
import prisma from "../prisma";
import RoomDeviceRepository from "../repositories/RoomDeviceRepository"
import deviceService from "./DeviceService"
import roomService from "./RoomService"
import { RoomDeviceCreate, RoomDeviceSearch, RoomDeviceUpdate, RoomDeviceUpdateDragAndDrop } from "../dto/room_device";
import { ObjectState } from "@prisma/client";
const service = {
    search: async (search: RoomDeviceSearch) => {
        return RoomDeviceRepository.findAll(search);
    },
    getById: async (id: number) => {
        const roomDevice = await RoomDeviceRepository.findById(id);
        if (!roomDevice) throw new Error("Không tìm thấy roomDevice");
        return roomDevice;
    },
    create: async (create: RoomDeviceCreate) => {
        const device = await deviceService.getById(create.device.id);
        const room = await roomService.getById(create.room.id);
        const roomDevice: any = {
            id: 0,
            room_id: room.id,
            device_id: device.id,
            ordering: create.ordering || 0,
            longitude: create.longitude,
            latitude: create.latitude,
            is_clone: create.is_clone,
        }
        return await RoomDeviceRepository.save(roomDevice);
    },
    update: async (update: RoomDeviceUpdate) => {
        const roomDevice: any = await service.getById(update.id);

        if (update.device) {
            const device = await deviceService.getById(update.device.id);
            roomDevice.device_id = device.id;
        }
        if (update.room) {
            const room = await roomService.getById(update.room.id);
            roomDevice.room_id = room.id;
        }
        if (update.ordering) {
            roomDevice.ordering = update.ordering;
        }
        if (update.longitude) {
            roomDevice.longitude = update.longitude;
        }
        if (update.latitude) {
            roomDevice.latitude = update.latitude;
        }
        if (update.is_clone != undefined) {
            roomDevice.is_clone = update.is_clone;
        }

        return await RoomDeviceRepository.save(roomDevice);
    },
    updateDragAndDrop: async (updates: RoomDeviceUpdateDragAndDrop[]) => {
        return prisma.$transaction(async () => {
            updates.forEach(async (update) => {
                await service.deleteAllByRoomId(update.id)
                update.devices.forEach(async (deviceUpdate: any) => {
                    const device = await deviceService.getById(deviceUpdate.id);
                    const room = await roomService.getById(update.id);

                    const roomDevice = await RoomDeviceRepository.findByRoomIdAndDeviceId(room.id, device.id);

                    if (roomDevice) {
                        roomDevice.longitude = deviceUpdate.longitude;
                        roomDevice.latitude = deviceUpdate.latitude;
                        roomDevice.ordering = deviceUpdate.ordering;
                        roomDevice.is_clone = deviceUpdate.is_clone;
                        roomDevice.state = ObjectState.ACTIVE;

                        await RoomDeviceRepository.save(roomDevice)
                    } else {
                        const roomDeviceCreate: RoomDeviceCreate = {
                            device: device,
                            room: room,
                            longitude: parseFloat(deviceUpdate.longitude) || 0,
                            latitude: parseFloat(deviceUpdate.latitude) || 0,
                            ordering: deviceUpdate.ordering,
                            is_clone: deviceUpdate.is_clone,
                            is_favorite: false,
                        }
                        await service.create(roomDeviceCreate);
                    }

                })
            })
            return true
        })
    },
    delete: async (id: number) => {
        const roomDevice: any = await service.getById(id);
        roomDevice.state = ObjectState.DELETED;
        roomDevice.deleted_at = new Date();
        return !!(await RoomDeviceRepository.save(roomDevice));
    },
    deleteAllByRoomId: async (roomId: number) => {
        prisma.$transaction(async () => {
            const search: any = {
                room: {
                    id: roomId
                }
            }
            const roomDevices: any = await service.search(search);

            roomDevices.forEach((item: any) => {
                item.state = ObjectState.DELETED;
                item.deleted_at = new Date();
                RoomDeviceRepository.save(item);
            })
            return true
        })
    },

}

export default service;