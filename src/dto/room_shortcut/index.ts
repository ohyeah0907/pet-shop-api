import { Room } from "@prisma/client"

export type RoomShortcutCreate = {
    room: Room,
    room_other: Room,
}

export type RoomShortcutUpdate = {
    id: number,
    room: Room,
    room_other: Room,
}