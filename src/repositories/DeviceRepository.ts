import { DeviceSearch } from "../dto/device";
import prisma from "../prisma"
import { Device, ObjectState } from "@prisma/client";


const findAll = async (search: DeviceSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        }
    }
    if (search.home) {
        condition.home_id = search.home.id;
    }
    if (search.preset) {
        condition.preset_id = search.preset.id;
    }
    if (search.ha_entity) {
        condition.ha_entity_id = search.ha_entity.id;
    }
    const devices = await prisma.device.findMany({
        where: condition,
        include: {
            home: true,
            ha_entity: true,
            preset: true,
            room_devices: {
                include: {
                    room: true,
                    device: true
                }
            }
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
            home: true,
            ha_entity: true,
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
                home: {
                    connect: {
                        id: device.home_id
                    }
                },
                type: device.type,
                ha_entity: device.ha_entity_id ? {
                    connect: {
                        id: device.ha_entity_id
                    }
                } : undefined,
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
                home: true,
                preset: true
            }
        });
    }
    return await prisma.device.create({
        data: {
            name: device.name,
            home: {
                connect: {
                    id: device.home_id
                }
            },
            description: device.description,
            type: device.type,
            ha_entity: device.ha_entity_id ? {
                connect: {
                    id: device.ha_entity_id
                }
            } : undefined,
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
            home: true,
            preset: true
        }
    });

}

export default {
    findAll,
    findById,
    save
}