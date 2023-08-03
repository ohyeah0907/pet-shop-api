import { House } from "@prisma/client"

export type HAEntityCreate = {
    name: string,
    description: string,
    house: House,
    entity_id: string,
    accessed_at: Date,
}

export type HAEntityUpdate = {
    id: number,
    name?: string,
    description?: string,
    house?: House,
    entity_id?: string,
    accessed_at?: Date,
}