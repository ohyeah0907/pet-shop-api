import { Home } from "@prisma/client"

export type HAEntityCreate = {
    name: string,
    description: string,
    home: Home,
    entity_id: string,
    accessed_at: Date,
}

export type HAEntityUpdate = {
    id: number,
    name?: string,
    description?: string,
    home?: Home,
    entity_id?: string,
    accessed_at?: Date,
}

export type HAEntitySearch = {
    home?: Home,
}