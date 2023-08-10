import { DeviceType } from "@prisma/client"

export type VoiceProjectCreate = {
    name?: string,
    project_id?: string,
    redirect_uris?: string[]
}

export type VoiceProjectUpdate = {
    id: number,
    name?: string,
    client_id?: DeviceType,
    project_id?: string,
    client_secret?: string,
    redirect_uris?: string[]
}