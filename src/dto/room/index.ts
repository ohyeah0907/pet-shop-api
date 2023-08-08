import { Home, Room, User } from "@prisma/client"

export type RoomCreate = {
    home: Home,
    // parent?: Room,
    user: User,
    name: string,
    image_url: string,
    ordering: number,
}

export type RoomUpdate = {
    id: number,
    home?: Home,
    // parent?: Room,
    user?: User,
    name?: string,
    image_url?: string,
    ordering?: number,
}