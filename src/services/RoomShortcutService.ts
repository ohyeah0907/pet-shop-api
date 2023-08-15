import roomShortcutRepository from "../repositories/RoomShortcutRepository"
import roomService from "./RoomService"
import { RoomShortcutCreate, RoomShortcutUpdate } from "../dto/room_shortcut";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return roomShortcutRepository.findAll();
    },
    getById: async (id: number) => {
        const roomShortcut = await roomShortcutRepository.findById(id);
        if (!roomShortcut) throw new Error("Không tìm thấy roomShortcut");
        return roomShortcut;
    },
    create: async (create: RoomShortcutCreate) => {
        const room = await roomService.getById(create.room.id);
        const roomOther = await roomService.getById(create.room_other.id);
        const roomShortcut: any = {
            id: 0,
            room_id: room.id,
            room_other_id: roomOther.id,
            longitude: create.longitude,
            latitude: create.latitude,
        }
        return await roomShortcutRepository.save(roomShortcut);
    },
    update: async (update: RoomShortcutUpdate) => {
        const roomShortcut: any = await service.getById(update.id);

        if (update.room) {
            const room = await roomService.getById(update.room.id);
            roomShortcut.room_id = room.id;
        }
        if (update.room_other) {
            const roomOther = await roomService.getById(update.room_other.id);
            roomShortcut.room_other_id = roomOther.id;
        }
        if (update.longitude) roomShortcut.longitude = update.longitude;
        if (update.latitude) roomShortcut.latitude = update.latitude;
        return await roomShortcutRepository.save(roomShortcut);
    },
    delete: async (id: number) => {
        const roomShortcut: any = await service.getById(id);
        roomShortcut.state = ObjectState.DELETED;
        roomShortcut.deleted_at = new Date();
        return !!(await roomShortcutRepository.save(roomShortcut));
    }
}

export default service;