import prisma from "../prisma"
import { Tag, ObjectState } from "@prisma/client";


const findAll = async () => {
    const tags = await prisma.tag.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return tags;
}

const findById = async (id: number) => {
    const tag = await prisma.tag.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return tag;
}

const save = async (tag: Tag) => {

    if (tag.id) {
        return await prisma.tag.update({
            where: {
                id: tag.id
            },
            data: {
                name: tag.name,
                state: tag.state,
                deleted_at: tag.deleted_at,
                updated_at: tag.updated_at,
            },
        });
    }
    return await prisma.tag.create({
        data: {
            name: tag.name,
        },
    });

}

export default {
    findAll,
    findById,
    save
}