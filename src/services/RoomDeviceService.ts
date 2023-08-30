import { RoomDevice } from "@prisma/client";
import { BadRequestResponse, NotFoundResponse } from "../handler/app-response";
import prisma from "../prisma";
import RoomDeviceRepository from "../repositories/RoomDeviceRepository"
import deviceService from "./DeviceService"
import roomService from "./RoomService"
import { RoomDeviceCreate, RoomDeviceUpdate, RoomDeviceUpdateDragAndDrop } from "../dto/room_device";
import { ObjectState } from "@prisma/client";
const service = {
    search: async (search: any) => {
        return RoomDeviceRepository.findAll();
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

        return await RoomDeviceRepository.save(roomDevice);
    },
    updateDragAndDrop: async (updates: RoomDeviceUpdateDragAndDrop[]) => {
        prisma.$transaction(async () => {
            updates.forEach(async (update) => {
                await RoomDeviceRepository.deleteAllByRoomId(update.id)
                update.devices.forEach(async (deviceUpdate: any) => {
                    const room = await roomService.getById(update.id);
                    const device = await deviceService.getById(deviceUpdate.id);
                    
                    const roomDevice: RoomDeviceCreate = {
                        device: device,
                        room: room,
                        longitude: parseFloat(deviceUpdate.longitude) || 0,
                        latitude: parseFloat(deviceUpdate.latitude) || 0,
                        ordering: deviceUpdate.ordering,
                        is_favorite: false,
                    }
                    await service.create(roomDevice);
                })
            })
        })
    },
    delete: async (id: number) => {
        const roomDevice: any = await service.getById(id);
        roomDevice.state = ObjectState.DELETED;
        roomDevice.deleted_at = new Date();
        return !!(await RoomDeviceRepository.save(roomDevice));
    }
}

export default service;