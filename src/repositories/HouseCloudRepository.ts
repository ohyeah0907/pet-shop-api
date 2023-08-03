import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { HouseCloud, ObjectState } from "@prisma/client";


const findAll = async () => {
    const cloudServers = await prisma.houseCloud.findMany({
        include: {
            cloud: true,
            house: true,
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
    const cloudServer = await prisma.houseCloud.findUnique({
        include: {
            cloud: true,
            house: true,
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

const save = async (houseCloud: HouseCloud) => {
    console.log(houseCloud);
    if (houseCloud.id) {
        return await prisma.houseCloud.update({
            where: {
                id: houseCloud.id
            },
            data: {
                house: { connect: { id: houseCloud.house_id }, },
                cloud: { connect: { id: houseCloud.cloud_id }, },
                cloud_port: houseCloud.cloud_port,
                vpn_ip: houseCloud.vpn_ip,
                private_key: houseCloud.private_key,
                public_key: houseCloud.public_key,
                pre_shared_key: houseCloud.pre_shared_key,
                state: houseCloud.state,
                deleted_at: houseCloud.deleted_at,
                updated_at: houseCloud.updated_at,
            },
            include: {
                cloud: true,
                house: true,
            },
        });
    }
    return await prisma.houseCloud.create({
        data: {
            house: { connect: { id: houseCloud.house_id }, },
            cloud: { connect: { id: houseCloud.cloud_id }, },
            cloud_port: houseCloud.cloud_port,
            vpn_ip: houseCloud.vpn_ip,
            private_key: houseCloud.private_key,
            public_key: houseCloud.public_key,
            pre_shared_key: houseCloud.pre_shared_key,
        },
        include: {
            cloud: true,
            house: true,
        },
    });

}

export default {
    findAll,
    findById,
    save
}