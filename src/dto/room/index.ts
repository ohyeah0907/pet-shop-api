import { Home, Room, User } from "@prisma/client"

export type RoomCreate = {
    home: Home,
    name: string,
    thumb_image: string,
    panorama_image: string,
}

export type RoomUpdate = {
    id: number,
    home?: Home,
    name?: string,
    ordering?: number,
    is_home?: boolean,
    thumb_image: string,
    panorama_image: string,
}

export type RoomSearch = {
    home: Home,
}