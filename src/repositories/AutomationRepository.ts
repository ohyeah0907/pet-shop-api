import prisma from "../prisma"
import { Automation, ObjectState } from "@prisma/client";


const findAll = async () => {
    const automations = await prisma.automation.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            home: true
        }
    });
    return automations;
}

const findById = async (id: number) => {
    const automation = await prisma.automation.findUnique({
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
    return automation;
}

const save = async (automation: Automation) => {

    if (automation.id) {
        return await prisma.automation.update({
            where: {
                id: automation.id
            },
            data: {
                name: automation.name,
                accessed_at: automation.accessed_at,
                home: {
                    connect: {
                        id: automation.home_id
                    }
                },
                entity_id: automation.entity_id,
                state: automation.state,
                deleted_at: automation.deleted_at,
                updated_at: automation.updated_at,
            },
            include: {
                home: true
            }
        });
    }
    return await prisma.automation.create({
        data: {
            name: automation.name,
            description: automation.description,
            accessed_at: automation.accessed_at,
            home: {
                connect: {
                    id: automation.home_id
                }
            },
            entity_id: automation.entity_id,
        },
        include: {
            home: true
        }
    });

}

export default {
    findAll,
    findById,
    save
}