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
            home: true
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
            home: true
        }
    });
    return script;
}
const findByHomeIdAndEntityId = async (homeId: number, entity_id: string) => {
    const script = await prisma.script.findFirst({
        where: {
            home_id: homeId,
            ha_entity: {
                entity_id: entity_id
            },
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            home: true
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
                home: {
                    connect: {
                        id: script.home_id
                    }
                },
                ha_entity: {
                    connect: {
                        id: script.ha_entity_id
                    }
                },
                state: script.state,
                deleted_at: script.deleted_at,
                updated_at: script.updated_at,
            },
            include: {
                home: true
            }
        });
    }
    return await prisma.script.create({
        data: {
            name: script.name,
            accessed_at: script.accessed_at,
            description: script.description,
            home: {
                connect: {
                    id: script.home_id
                }
            },
            ha_entity: {
                connect: {
                    id: script.ha_entity_id
                }
            }
        },
        include: {
            home: true
        }
    });

}

export default {
    findAll,
    findById,
    findByHomeIdAndEntityId,
    save
}