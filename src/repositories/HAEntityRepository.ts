import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { HAEntity, ObjectState, DeviceType } from "@prisma/client";
import { HAEntitySearch } from "../dto/ha_entity";


const findAll = async (search: HAEntitySearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        }
    }
    if(search.home) {
        condition.home_id = search.home.id;
    }
    const haEntities = await prisma.hAEntity.findMany({
        include: {
            home: true,
        },
        where: condition,
    });
    return haEntities;
}

const findById = async (id: number) => {
    const haEntity = await prisma.hAEntity.findUnique({
        include: {
            home: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return haEntity;
}
const findByEntityId = async (entityId: string) => {
    const haEntity = await prisma.hAEntity.findFirst({
        include: {
            home: true,
        },
        where: {
            entity_id: entityId,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return haEntity;
}

const save = async (haEntity: HAEntity) => {

    if (haEntity.id) {
        return await prisma.hAEntity.update({
            where: {
                id: haEntity.id
            },
            data: {
                name: haEntity.name,
                description: haEntity.description,
                entity_id: haEntity.entity_id,
                home: {
                    connect: {
                        id: haEntity.home_id
                    }
                },
                accessed_at: haEntity.accessed_at,
                state: haEntity.state,
                deleted_at: haEntity.deleted_at,
                updated_at: haEntity.updated_at,
            },
        });
    }
    return await prisma.hAEntity.create({
        data: {
            name: haEntity.name,
            description: haEntity.description,
            entity_id: haEntity.entity_id,
            home: {
                connect: {
                    id: haEntity.home_id
                }
            },
            accessed_at: haEntity.accessed_at,

        },
    });

}

export default {
    findAll,
    findById,
    findByEntityId,
    save
}