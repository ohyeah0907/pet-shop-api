import { DeviceType, Home, Preset } from "@prisma/client"

export type DeviceCreate = {
    home: Home,
    entity_id: string,
    type: DeviceType,
    sub_type: string,
    status: boolean,
    attributes: string,
    preset: Preset,
    name: string,
    description: string
}

export type DeviceUpdate = {
    id: number,
    home: Home,
    entity_id: string,
    name: string,
    type: DeviceType,
    sub_type: string,
    status: boolean,
    attributes: string,
    preset: Preset,
    description: string

}