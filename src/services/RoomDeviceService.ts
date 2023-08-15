import { RoomDevice } from "@prisma/client";
import { BadRequestResponse, NotFoundResponse } from "../handler/app-response";
import prisma from "../prisma";
import RoomDeviceRepository from "../repositories/RoomDeviceRepository"
import deviceService from "./DeviceService"
import roomService from "./RoomService"
import { RoomDeviceCreate, RoomDeviceUpdate } from "../dto/room_device";
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
            ordering: create.ordering,
            longitude: create.longitude,
            latitude: create.latitude,
            is_favorite: create.is_favorite,
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
        if(update.is_favorite != null) {
            roomDevice.is_favorite = update.is_favorite;
        }
        if(update.ordering) {
            roomDevice.ordering = update.ordering;
        }
        if(update.longitude) {
            roomDevice.longitude = update.longitude;
        }
        if(update.latitude) {
            roomDevice.latitude = update.latitude;
        }
        
        return await RoomDeviceRepository.save(roomDevice);
    },
    delete: async (id: number) => {
        const roomDevice: any = await service.getById(id);
        roomDevice.state = ObjectState.DELETED;
        roomDevice.deleted_at = new Date();
        return !!(await RoomDeviceRepository.save(roomDevice));
    }
}

export default service;