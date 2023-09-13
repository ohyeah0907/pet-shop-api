import { Device, Home, User } from "@prisma/client"

export type UserDeviceCreate = {
    device: Device,
    user: User,
    is_favorite: boolean,
    enable: boolean,
}

export type UserDeviceUpdate = {
    id: number,
    device?: Device,
    user?: User,
    is_favorite?: boolean,
    enable?: boolean,
}
export type UserDeviceTableCheckUpdate = {
    user_id: number,
    devices: any[]
}

export type UserDeviceSearch = {
    user: User,
    device: Device,
    home?: Home
}