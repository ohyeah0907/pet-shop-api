import { HAEntity, Home } from "@prisma/client"

export type AutomationCreate = {
    home: Home,
    ha_entity: HAEntity,
    name: string,
    description: string,
    accessed_at: Date,
}

export type AutomationUpdate = {
    id: number,
    home: Home,
    ha_entity: HAEntity,
    name: string,
    description: string,
    accessed_at: Date,
}