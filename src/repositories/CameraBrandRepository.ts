import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { CameraBrand, ObjectState, DeviceType } from "@prisma/client";
import { CameraBrandSearch } from "../dto/camera_brand";


const findAll = async (search: CameraBrandSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        }
    }
    const cameraBrands = await prisma.cameraBrand.findMany({
        where: condition
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