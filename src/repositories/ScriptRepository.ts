import prisma from "../prisma"
import { Script, ObjectState } from "@prisma/client";


const findAll = async () => {
    const scripts = await prisma.script.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            house: true
        }
    });
    return scripts;
}

const findById = async (id: number) => {
    const script = await prisma.script.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            house: true
        }
    });
    return script;
}

const save = async (script: Script) => {

    if (script.id) {
        return await prisma.script.update({
            where: {
                id: script.id
            },
            data: {
                name: script.name,
                accessed_at: script.accessed_at,
                house: {
                    connect: {
                        id: script.house_id
                    }
                },
                entity_id: script.entity_id,
                state: script.state,
                deleted_at: script.deleted_at,
                updated_at: script.updated_at,
            },
            include: {
                house: true
            }
        });
    }
    return await prisma.script.create({
        data: {
            name: script.name,
            accessed_at: script.accessed_at,
            description: script.description,
            house: {
                connect: {
                    id: script.house_id
                }
            },
            entity_id: script.entity_id,
        },
        include: {
            house: true
        }
    });

}

export default {
    findAll,
    findById,
    save
}