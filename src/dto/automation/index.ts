import { Home } from "@prisma/client"

export type AutomationCreate = {
    home: Home,
    entity_id: string,
    name: string,
    description: string,
    accessed_at: Date,
}

export type AutomationUpdate = {
    id: number,
    home: Home,
    entity_id: string,
    name: string,
    description: string,
    accessed_at: Date,
}