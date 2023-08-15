import { Device, Room } from "@prisma/client";

export type RoomDeviceCreate = {
    room: Room,
    device: Device,
    is_favorite: boolean,
    longitude: number,
    latitude: number,
    ordering: number,
}

export type RoomDeviceUpdate = {
    id: number;
    room?: Room,
    device?: Device,
    longitude?: number,
    latitude?: number,
    is_favorite?: boolean,
    ordering?: number,
}