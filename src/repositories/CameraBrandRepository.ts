import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { CameraBrand, ObjectState, DeviceType } from "@prisma/client";


const findAll = async () => {
    const cameraBrands = await prisma.cameraBrand.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return cameraBrands;
}

const findById = async (id: number) => {
    const cameraBrand = await prisma.cameraBrand.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return cameraBrand;
}

const save = async (cameraBrand: CameraBrand) => {

    if (cameraBrand.id) {
        return await prisma.cameraBrand.update({
            where: {
                id: cameraBrand.id
            },
            data: {
                name: cameraBrand.name,
                url_pattern: cameraBrand.url_pattern,
                preset_pattern: cameraBrand.preset_pattern,
                state: cameraBrand.state,
                deleted_at: cameraBrand.deleted_at,
                updated_at: cameraBrand.updated_at,
            },
        });
    }
    return await prisma.cameraBrand.create({
        data: {
            name: cameraBrand.name,
            url_pattern: cameraBrand.url_pattern,
            preset_pattern: cameraBrand.preset_pattern,
        },
    });

}

export default {
    findAll,
    findById,
    save
}