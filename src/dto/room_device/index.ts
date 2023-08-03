import { Device, Room } from "@prisma/client";

export type RoomDeviceCreate = {
    room: Room,
    device: Device,
    is_favorite: boolean,
    ordering: number,
}

export type RoomDeviceUpdate = {
    id: number;
    room?: Room,
    device?: Device,
    is_favorite?: boolean,
    ordering?: number,
}