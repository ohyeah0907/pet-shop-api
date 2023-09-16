import { DeviceTypeSearch } from "../dto/device_type";
import prisma from "../prisma"
import { DeviceType, DeviceTypeCode, ObjectState } from "@prisma/client";


const findAll = async (search: DeviceTypeSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        }
    }
    // if (search.home) {
    //     condition.home_id = search.home.id;
    // }
    // if (search.preset) {
    //     condition.preset_id = search.preset.id;
    // }
    // if (search.ha_entity) {
    //     condition.ha_entity_id = search.ha_entity.id;
    // }
    const deviceTypes = await prisma.deviceType.findMany({
        where: condition,
    });
    return deviceTypes;
}

const findById = async (id: number) => {
    const deviceType = await prisma.deviceType.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        },
    });
    return deviceType;
}
const findByCode = async (code: DeviceTypeCode) => {
    const deviceType = await prisma.deviceType.findUnique({
        where: {
            code: code,
            NOT: {
                state: ObjectState.DELETED
            }
        },
    });
    return deviceType;
}

const save = async (deviceType: DeviceType) => {

    if (deviceType.id) {
        return await prisma.deviceType.update({
            where: {
                id: deviceType.id
            },
            data: {
                name: deviceType.name,
                code: deviceType.code,
                state: deviceType.state,
                deleted_at: deviceType.deleted_at,
                updated_at: deviceType.updated_at,
            },
        });
    }
    return await prisma.deviceType.create({
        data: {
            name: deviceType.name,
            code: deviceType.code,
        },
    });

}

export default {
    findAll,
    findById,
    findByCode,
    save
}