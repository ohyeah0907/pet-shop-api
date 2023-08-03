import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { Preset, ObjectState, DeviceType } from "@prisma/client";


const findAll = async () => {
    const presets = await prisma.preset.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            camera: true,
            devices: true
        }
    });
    return presets;
}

const findById = async (id: number) => {
    const preset = await prisma.preset.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            camera: true,
            devices: true
        }
    });
    return preset;
}

const save = async (preset: Preset) => {

    if (preset.id) {
        return await prisma.preset.update({
            where: {
                id: preset.id
            },
            data: {
                name: preset.name,
                url: preset.url,
                camera: {
                    connect: {
                        id: preset.camera_id
                    }
                },
                state: preset.state,
                deleted_at: preset.deleted_at,
                updated_at: preset.updated_at,
            },
            include: {
                camera: true,
                devices: true
            }
        });
    }
    return await prisma.preset.create({
        data: {
            name: preset.name,
            camera: {
                connect: {
                    id: preset.camera_id
                }
            },
            url: preset.url,
        },
        include: {
            camera: true,
            devices: true
        }
    });

}

export default {
    findAll,
    findById,
    save
}