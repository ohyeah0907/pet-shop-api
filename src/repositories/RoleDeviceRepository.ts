import { RoleDevice, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const roleDevice = await prisma.roleDevice.findUnique({
        include: {
            device: true,
            role_house: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return roleDevice;
}

const findAll = async () => {
    const roleDevices = await prisma.roleDevice.findMany({
        include: {
            device: true,
            role_house: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return roleDevices;
}
const save = async (roleDevice: RoleDevice) => {
    if (roleDevice.id) {
        return prisma.roleDevice.update({
            where: {
                id: roleDevice.id
            },
            data: {
                role_house: {
                    connect: {
                        id: roleDevice.role_house_id
                    }
                },
                device: {
                    connect: {
                        id: roleDevice.device_id
                    }
                },
                enabled: roleDevice.enabled,
                state: roleDevice.state,
                deleted_at: roleDevice.deleted_at,
            },
            include: {
                device: true,
                role_house: true,
            }
        })
    }
    return prisma.roleDevice.create({
        data: {
            role_house: {
                connect: {
                    id: roleDevice.role_house_id
                }
            },
            device: {
                connect: {
                    id: roleDevice.device_id
                }
            },
            enabled: roleDevice.enabled,
        },
        include: {
            device: true,
            role_house: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}