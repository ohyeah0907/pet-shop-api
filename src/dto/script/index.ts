import { Home } from "@prisma/client"

export type ScriptCreate = {
    home: Home,
    entity_id: string,
    name: string,
    description: string,
    accessed_at: Date,
}

export type ScriptUpdate = {
    id: number,
    home: Home,
    entity_id: string,
    name: string,
    description: string
    accessed_at: Date,
}