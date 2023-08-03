import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { Filter, ObjectState, DeviceType } from "@prisma/client";


const findAll = async () => {
    const filters = await prisma.filter.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return filters;
}

const findById = async (id: number) => {
    const filter = await prisma.filter.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return filter;
}

const save = async (filter: Filter) => {

    if (filter.id) {
        return await prisma.filter.update({
            where: {
                id: filter.id
            },
            data: {
                name: filter.name,
                background_off: filter.background_off,
                background_on: filter.background_on,
                icon: filter.icon,
                color_off: filter.color_off,
                color_on: filter.color_on,
                device_type: filter.device_type,
                state: filter.state,
                deleted_at: filter.deleted_at,
                updated_at: filter.updated_at,
            },
        });
    }
    return await prisma.filter.create({
        data: {
            name: filter.name,
            background_off: filter.background_off,
            background_on: filter.background_on,
            icon: filter.icon,
            color_off: filter.color_off,
            color_on: filter.color_on,
            device_type: filter.device_type
        },
    });

}

export default {
    findAll,
    findById,
    save
}