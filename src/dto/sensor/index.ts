import { Home } from "@prisma/client"

export type SensorCreate = {
    home: Home,
    entity_id: string,
    name: string,
}

export type SensorUpdate = {
    id: number,
    home: Home,
    entity_id: string,
    name: string,
}