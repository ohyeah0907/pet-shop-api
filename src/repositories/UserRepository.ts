import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { User, ObjectState } from "@prisma/client";


const findAll = async () => {
    const users = await prisma.user.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        },
        orderBy: {
            id: 'asc'
        },
        select: {
            avatar_url: true,
            created_at: true,
            email: true,
            phone: true,
            verification_token: true,
            name: true,
            is_verified: true,
            is_admin: true,
            is_locked: true,
            is_voice: true,
            user_homes: true,
            user_tags: true,
            user_notifications: true,
            user_socials: true,
            user_room_devices: true,
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
        },
        select: {
            avatar_url: true,
            created_at: true,
            email: true,
            phone: true,
            verification_token: true,
            name: true,
            is_verified: true,
            is_admin: true,
            is_locked: true,
            is_voice: true,
            user_homes: true,
            user_tags: true,
            user_notifications: true,
            user_socials: true,
            user_room_devices: true,
        }
    });
    return user;
}
const findByUsername = async (username: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username: username,
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return user;
}

const findByEmail = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email: email,
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return user;
}

const findByVerificationToken = async (token: string) => {
    const user = await prisma.user.findFirst({
        where: {
            verification_token: token,
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return user;
}

const findByVoiceUsername = async (username: string) => {
    const user = await prisma.user.findFirst({
        where: {
            username: username,
            is_voice: true,
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
                avatar_url: user.avatar_url,
                username: user.username,
                password: user.password,
                is_locked: user.is_locked,
                verification_token: user.verification_token,
                is_admin: user.is_admin,
                is_voice: user.is_voice,
                is_verified: user.is_verified,
                state: user.state,
                deleted_at: user.deleted_at,
                updated_at: user.updated_at,
            },
            select: {
                id: true,
                name: true,
                phone: true,
                verification_token: true,
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
            avatar_url: user.avatar_url,
            username: user.username,
            verification_token: user.verification_token,
            password: user.password,
            is_locked: user.is_locked,
            is_voice: user.is_voice,
            is_verified: user.is_verified
        },
        select: {
            id: true,
            name: true,
            email: true,
            verification_token: true,
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
    findByEmail,
    findByVoiceUsername,
    findByVerificationToken,
    save
}