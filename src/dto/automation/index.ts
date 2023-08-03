import { House } from "@prisma/client"

export type AutomationCreate = {
    house: House,
    entity_id: string,
    name: string,
    description: string,
    accessed_at: Date,
}

export type AutomationUpdate = {
    id: number,
    house: House,
    entity_id: string,
    name: string,
    description: string,
    accessed_at: Date,
}