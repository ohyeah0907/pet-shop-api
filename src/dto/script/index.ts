import { HAEntity, Home } from "@prisma/client"

export type ScriptCreate = {
    home: Home,
    ha_entity: HAEntity,
    name: string,
    description: string,
    accessed_at: Date,
}

export type ScriptUpdate = {
    id: number,
    home: Home,
    ha_entity: HAEntity,
    name: string,
    description: string
    accessed_at: Date,
}