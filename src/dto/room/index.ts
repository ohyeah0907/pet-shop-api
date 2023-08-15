import { Home, Room, User } from "@prisma/client"

export type RoomCreate = {
    home: Home,
    // parent?: Room,
    user: User,
    name: string,
    image_url: string,
}

export type RoomUpdate = {
    id: number,
    home?: Home,
    // parent?: Room,
    user?: User,
    name?: string,
    image_url?: string,
    ordering?: number,
    is_home?: boolean,
}

export type RoomSearch = {
    user: User,
    home: Home,
}