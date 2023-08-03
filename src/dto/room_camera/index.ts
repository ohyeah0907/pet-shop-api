import { Camera, DeviceType, Room } from "@prisma/client"

export type RoomCameraCreate = {
    room: Room,
    camera: Camera,
    ordering: number,
    pinned: boolean,
}

export type RoomCameraUpdate = {
    id: number,
    room?: Room,
    camera?: Camera,
    ordering?: number,
    pinned?: boolean,
}