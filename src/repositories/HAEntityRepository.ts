import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { HAEntity, ObjectState, DeviceType } from "@prisma/client";


const findAll = async () => {
    const haEntities = await prisma.hAEntity.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return haEntities;
}

const findById = async (id: number) => {
    const haEntity = await prisma.hAEntity.findUnique({
        where: {
            id: id,
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
    save
}