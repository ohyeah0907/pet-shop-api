import prisma from "../prisma"
import { Actionable, ObjectState } from "@prisma/client";


const findAll = async () => {
    const actionables = await prisma.actionable.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            room: true
        }
    });
    return actionables;
}

const findById = async (id: number) => {
    const actionable = await prisma.actionable.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            room: true
        }
    });
    return actionable;
}

const save = async (actionable: Actionable) => {

    if (actionable.id) {
        return await prisma.actionable.update({
            where: {
                id: actionable.id
            },
            data: {
                name: actionable.name,
                room: {
                    connect: {
                        id: actionable.room_id
                    }
                },
                type: actionable.type,
                type_id: actionable.type_id,
                ordering: actionable.ordering,
                state: actionable.state,
                deleted_at: actionable.deleted_at,
                updated_at: actionable.updated_at,
            },
            include: {
                room: true
            }
        });
    }
    return await prisma.actionable.create({
        data: {
            name: actionable.name,
            room: {
                connect: {
                    id: actionable.room_id
                }
            },
            type: actionable.type,
            type_id: actionable.type_id,
            ordering: actionable.ordering,
        },
        include: {
            room: true
        }
    });

}

export default {
    findAll,
    findById,
    save
}