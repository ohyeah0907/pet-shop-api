import { Tag, User } from "@prisma/client";

export type UserTagCreate = {
    user: User,
    tag: Tag,
}

export type UserTagUpdate = {
    id: number,
    user: User,
    tag: Tag,
}