import { DeviceType, HAEntity, Home, Preset } from "@prisma/client"

export type DeviceCreate = {
    home: Home,
    ha_entity: HAEntity,
    type: DeviceType,
    sub_type: string,
    attributes: string,
    preset: Preset,
    name: string,
    description: string
}

export type DeviceUpdate = {
    id: number,
    home: Home,
    ha_entity: HAEntity,
    name: string,
    type: DeviceType,
    sub_type: string,
    status: boolean,
    attributes: string,
    preset: Preset,
    description: string

}

export type DeviceSearch = {
    home: Home,
    ha_entity: HAEntity,
    preset: Preset,
}