import { ActionableType, Room } from "@prisma/client"

export type ActionableCreate = {
    room: Room,
    type: ActionableType,
    type_id: number,
    name: string,
    ordering: number,
}

export type ActionableUpdate = {
    id: number,
    room: Room,
    type: ActionableType,
    type_id: number,
    name: string,
    ordering: number,
}

export type ActionableDto = {
    id: number,
    room: Room,
    type: ActionableType,
    data: any,
    name: string,
    ordering: number,
    state: string,
    deleted_at?: Date | null,
    created_at: Date,
    updated_at: Date,
}
