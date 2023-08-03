import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { User, ObjectState } from "@prisma/client";


const findAll = async () => {
    const users = await prisma.user.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return users;
}

const findById = async (id: number) => {
    const user = await prisma.user.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return user;
}
const findByUsername = async (username: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: username,
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return user;
}

const save = async (user: User) => {
    if (user.id) {
        return await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                username: user.username,
                password: user.password,
                is_locked: user.is_locked,
                is_admin: user.is_admin,
                is_voice: user.is_voice,
                state: user.state,
                deleted_at: user.deleted_at,
                updated_at: user.updated_at,
            },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                username: true,
            }
        });
    }
    return await prisma.user.create({
        data: {
            name: user.name,
            phone: user.phone,
            email: user.email,
            username: user.username,
            password: user.password,
            is_locked: user.is_locked,
            is_voice: user.is_voice,
        },
        select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            deleted_at: true,
            state: true,
        }
    });

}

export default {
    findAll,
    findById,
    findByUsername,
    save
}