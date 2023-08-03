import prisma from "../prisma"
import { Device, ObjectState } from "@prisma/client";


const findAll = async () => {
    const devices = await prisma.device.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            house: true,
            preset: true
        }
    });
    return devices;
}

const findById = async (id: number) => {
    const device = await prisma.device.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            house: true,
            preset: true
        }
    });
    return device;
}

const save = async (device: Device) => {

    if (device.id) {
        return await prisma.device.update({
            where: {
                id: device.id
            },
            data: {
                name: device.name,
                house: {
                    connect: {
                        id: device.house_id
                    }
                },
                type: device.type,
                entity_id: device.entity_id,
                sub_type: device.sub_type,
                status: device.status,
                preset: {
                    connect: {
                        id: device.preset_id || undefined
                    }
                },
                attributes: device.attributes,
                state: device.state,
                deleted_at: device.deleted_at,
                updated_at: device.updated_at,
            },
            include: {
                house: true,
                preset: true
            }
        });
    }
    return await prisma.device.create({
        data: {
            name: device.name,
            house: {
                connect: {
                    id: device.house_id
                }
            },
            description: device.description,
            type: device.type,
            entity_id: device.entity_id,
            sub_type: device.sub_type,
            status: device.status,
            preset: {
                connect: {
                    id: device.preset_id || undefined
                }
            },
            attributes: device.attributes,
        },
        include: {
            house: true,
            preset: true
        }
    });

}

export default {
    findAll,
    findById,
    save
}