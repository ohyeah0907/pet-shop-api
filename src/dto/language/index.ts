import { DeviceType } from "@prisma/client"

export type LanguageCreate = {
    name: string,
    code: string,
}

export type LanguageUpdate = {
    id: number,
    name?: string,
    code?: string,
}