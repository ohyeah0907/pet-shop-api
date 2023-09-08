import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { UserSocial, ObjectState, DeviceType } from "@prisma/client";


const findAll = async () => {
    const userSocials = await prisma.userSocial.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userSocials;
}

const findById = async (id: number) => {
    const userSocial = await prisma.userSocial.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userSocial;
}

const save = async (userSocial: UserSocial) => {

    if (userSocial.id) {
        return await prisma.userSocial.update({
            where: {
                id: userSocial.id
            },
            data: {
                name: userSocial.name,
                email: userSocial.email,
                access_token: userSocial.access_token,
                avatar_url: userSocial.avatar_url,
                provider_id: userSocial.provider_id,
                provider_name: userSocial.provider_name,
                user: {
                    connect: {
                        id: userSocial.user_id
                    }
                },
                state: userSocial.state,
                deleted_at: userSocial.deleted_at,
                updated_at: userSocial.updated_at,
            },
        });
    }
    return await prisma.userSocial.create({
        data: {
            name: userSocial.name,
            email: userSocial.email,
            access_token: userSocial.access_token,
            avatar_url: userSocial.avatar_url,
            provider_id: userSocial.provider_id,
            provider_name: userSocial.provider_name,
            user: {
                connect: {
                    id: userSocial.user_id
                }
            },
        },
    });

}

export default {
    findAll,
    findById,
    save
}