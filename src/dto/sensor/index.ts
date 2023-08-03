import { House } from "@prisma/client"

export type SensorCreate = {
    house: House,
    entity_id: string,
    name: string,
}

export type SensorUpdate = {
    id: number,
    house: House,
    entity_id: string,
    name: string,
}