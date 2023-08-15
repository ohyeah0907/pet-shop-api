import { Camera, DeviceType } from "@prisma/client"

export type PresetCreate = {
    name: string,
    camera: Camera
    url: string,
}

export type PresetUpdate = {
    id: number,
    name?: string,
    camera?: Camera,
    url?: string,
}

export type PresetSearch = {
    name?: string,
    camera?: Camera,
}