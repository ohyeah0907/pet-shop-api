import { DeviceType, HAEntity, Home, Preset } from "@prisma/client"

export type DeviceTypeCreate = {
    name: string,
    code: string
}

export type DeviceTypeUpdate = {
    id: number,
    name: string,
    code: string

}

export type DeviceTypeSearch = {
}