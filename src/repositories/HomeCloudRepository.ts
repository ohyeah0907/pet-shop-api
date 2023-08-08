import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { HomeCloud, ObjectState } from "@prisma/client";


const findAll = async () => {
    const cloudServers = await prisma.homeCloud.findMany({
        include: {
            cloud: true,
            home: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return cloudServers;
}

const findById = async (id: number) => {
    const cloudServer = await prisma.homeCloud.findUnique({
        include: {
            cloud: true,
            home: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return cloudServer;
}

const save = async (homeCloud: HomeCloud) => {
    console.log(homeCloud);
    if (homeCloud.id) {
        return await prisma.homeCloud.update({
            where: {
                id: homeCloud.id
            },
            data: {
                home: { connect: { id: homeCloud.home_id }, },
                cloud: { connect: { id: homeCloud.cloud_id }, },
                cloud_port: homeCloud.cloud_port,
                vpn_ip: homeCloud.vpn_ip,
                private_key: homeCloud.private_key,
                public_key: homeCloud.public_key,
                pre_shared_key: homeCloud.pre_shared_key,
                state: homeCloud.state,
                deleted_at: homeCloud.deleted_at,
                updated_at: homeCloud.updated_at,
            },
            include: {
                cloud: true,
                home: true,
            },
        });
    }
    return await prisma.homeCloud.create({
        data: {
            home: { connect: { id: homeCloud.home_id }, },
            cloud: { connect: { id: homeCloud.cloud_id }, },
            cloud_port: homeCloud.cloud_port,
            vpn_ip: homeCloud.vpn_ip,
            private_key: homeCloud.private_key,
            public_key: homeCloud.public_key,
            pre_shared_key: homeCloud.pre_shared_key,
        },
        include: {
            cloud: true,
            home: true,
        },
    });

}

export default {
    findAll,
    findById,
    save
}