import { DeviceType } from "@prisma/client"

export type FilterCreate = {
    name: string,
    device_type: DeviceType,
    icon: string,
    background_on: string,
    background_off: string,
    color_on: string,
    color_off: string,
}

export type FilterUpdate = {
    id: number,
    name?: string,
    device_type?: DeviceType,
    icon?: string,
    background_on?: string,
    background_off?: string,
    color_on?: string,
    color_off?: string,
}