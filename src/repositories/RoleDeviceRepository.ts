import { RoleDevice, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const roleDevice = await prisma.roleDevice.findUnique({
        include: {
            device: true,
            role_home: true,
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
            role_home: true,
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
                role_home: {
                    connect: {
                        id: roleDevice.role_home_id
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
                role_home: true,
            }
        })
    }
    return prisma.roleDevice.create({
        data: {
            role_home: {
                connect: {
                    id: roleDevice.role_home_id
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
            role_home: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}