import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { Cloud, ObjectState } from "@prisma/client";


const findAll = async () => {
    const clouds = await prisma.cloud.findMany({
        include: {
            home_clouds: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return clouds;
}

const findById = async (id: number) => {
    const cloud = await prisma.cloud.findUnique({
        include: {
            home_clouds: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return cloud;
}

const save = async (cloud: Cloud) => {

    if (cloud.id) {
        return await prisma.cloud.update({
            where: {
                id: cloud.id
            },
            data: {
                ip: cloud.ip,
                domain: cloud.domain,
                state: cloud.state,
                deleted_at: cloud.deleted_at,
                updated_at: cloud.updated_at,
            },
            include: {
                home_clouds: true,
            },
        });
    }
    return await prisma.cloud.create({
        data: {
            ip: cloud.ip,
            domain: cloud.domain,
        },
        include: {
            home_clouds: true,
        },
    });

}

export default {
    findAll,
    findById,
    save
}