import { Camera, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const camera = await prisma.camera.findUnique({
        include: {
            house: true,
            camera_brand: true,
            presets: true,
            room_cameras: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return camera;
}

const findAll = async () => {
    const cameras = await prisma.camera.findMany({
        include: {
            house: true,
            camera_brand: true,
            presets: true,
            room_cameras: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return cameras;
}
const save = async (camera: Camera) => {
    if (camera.id) {
        return prisma.camera.update({
            where: {
                id: camera.id
            },
            data: {
                name: camera.name,
                house: {
                    connect: {
                        id: camera.house_id
                    }
                },
                username: camera.username,
                password: camera.password,
                camera_brand: {
                    connect: {
                        id: camera.camera_brand_id
                    }
                },
                lan_ip: camera.lan_ip,
                lan_port: camera.lan_port,
                lan_uri: camera.lan_uri,
                wan_ip: camera.wan_ip,
                wan_port: camera.wan_port,
                wan_uri: camera.wan_uri,
                cloud_domain: camera.cloud_domain,
                cloud_uri: camera.cloud_uri,
                cloud_port: camera.cloud_port,
                state: camera.state,
                deleted_at: camera.deleted_at,
            },
            include: {
                house: true,
                camera_brand: true,
                presets: true,
                room_cameras: true,
            }
        })
    }
    return prisma.camera.create({
        data: {
            name: camera.name,
            house: {
                connect: {
                    id: camera.house_id
                }
            },
            username: camera.username,
            password: camera.password,
            camera_brand: {
                connect: {
                    id: camera.camera_brand_id
                }
            },
            lan_ip: camera.lan_ip,
            lan_port: camera.lan_port,
            lan_uri: camera.lan_uri,
            wan_ip: camera.wan_ip,
            wan_port: camera.wan_port,
            wan_uri: camera.wan_uri,
            cloud_domain: camera.cloud_domain,
            cloud_uri: camera.cloud_uri,
            cloud_port: camera.cloud_port,
        },
        include: {
            house: true,
            camera_brand: true,
            presets: true,
            room_cameras: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}