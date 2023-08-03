import prisma from "../prisma"
import { UserTag, ObjectState } from "@prisma/client";


const findAll = async () => {
    const userTags = await prisma.userTag.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        },
        include: {
            user: true,
            tag: true,
        }
    });
    return userTags;
}

const findById = async (id: number) => {
    const userTag = await prisma.userTag.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            user: true,
            tag: true,
        }
    });
    return userTag;
}

const save = async (userTag: UserTag) => {
    if (userTag.id) {
        return await prisma.userTag.update({
            where: {
                id: userTag.id
            },
            data: {
                user: {
                    connect: {
                        id: userTag.user_id
                    }
                },
                tag: {
                    connect: {
                        id: userTag.tag_id
                    }
                },
                state: userTag.state,
                deleted_at: userTag.deleted_at,
                updated_at: userTag.updated_at,
            },
            include: {
                user: true,
                tag: true,
            }
        });
    }
    return await prisma.userTag.create({
        data: {
            user: {
                connect: {
                    id: userTag.user_id
                }
            },
            tag: {
                connect: {
                    id: userTag.tag_id
                }
            },
        },
        include: {
            user: true,
            tag: true,
        }
    });

}

export default {
    findAll,
    findById,
    save
}