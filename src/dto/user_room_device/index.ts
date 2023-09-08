import { RoomDevice, User } from "@prisma/client"

export type UserRoomDeviceCreate= {
    room_device: RoomDevice,
    user: User,
    is_favorite: boolean,
    enable: boolean,
}

export type UserRoomDeviceUpdate= {
    id: number,
    room_device?: RoomDevice,
    user?: User,
    is_favorite?: boolean,
    enable?: boolean,
}

export type UserRoomDeviceSearch = {
    user: User,
    room_device: RoomDevice
}