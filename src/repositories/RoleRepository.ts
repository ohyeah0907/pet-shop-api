import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { Role, ObjectState } from "@prisma/client";


const findAll = async () => {
    const roles = await prisma.role.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        },
        orderBy:{
            id: 'asc'
        }
    });
    return roles;
}

const findById = async (id: number) => {
    const role = await prisma.role.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return role;
}

const save = async (role: Role) => {

    if (role.id) {
        return await prisma.role.update({
            where: {
                id: role.id
            },
            data: {
                name: role.name,
                is_owner: role.is_owner,
                state: role.state,
                deleted_at: role.deleted_at,
            },
            select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
                deleted_at: true,
                state: true,
                is_owner: true,
            }
        });
    }
    return await prisma.role.create({
        data: {
            name: role.name,
            is_owner: role.is_owner,
        },
        select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            deleted_at: true,
            state: true,
            is_owner: true,
        }
    });

}

export default {
    findAll,
    findById,
    save
}