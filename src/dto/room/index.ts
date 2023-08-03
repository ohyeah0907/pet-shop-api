import { House, Room, User } from "@prisma/client"

export type RoomCreate = {
    house: House,
    // parent?: Room,
    user: User,
    name: string,
    image_url: string,
    ordering: number,
}

export type RoomUpdate = {
    id: number,
    house?: House,
    // parent?: Room,
    user?: User,
    name?: string,
    image_url?: string,
    ordering?: number,
}