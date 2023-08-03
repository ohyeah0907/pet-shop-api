import { House } from "@prisma/client"

export type ScriptCreate = {
    house: House,
    entity_id: string,
    name: string,
    description: string,
    accessed_at: Date,
}

export type ScriptUpdate = {
    id: number,
    house: House,
    entity_id: string,
    name: string,
    description: string
    accessed_at: Date,
}