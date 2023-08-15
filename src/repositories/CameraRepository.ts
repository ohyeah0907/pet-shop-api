import { Camera, ObjectState } from "@prisma/client";
import prisma from "../prisma";
import { CameraSearch } from "../dto/camera";
const findById = async (id: number) => {
    const camera = await prisma.camera.findUnique({
        include: {
            home: true,
            camera_brand: true,
            ha_entity: true,
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

const findAll = async (search: CameraSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        }
    }
    if(search.home) {
        condition.home_id = search.home.id;
    }
    const cameras = await prisma.camera.findMany({
        include: {
            home: true,
            camera_brand: true,
            ha_entity: true,
            presets: true,
            room_cameras: true,
        },
        where: condition
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
                home: {
                    connect: {
                        id: camera.home_id
                    }
                },
                ha_entity: camera.ha_entity_id ? {
                    connect: {
                        id: camera.ha_entity_id
                    }
                }: undefined,
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
                home: true,
                camera_brand: true,
                presets: true,
                room_cameras: true,
            }
        })
    }
    return prisma.camera.create({
        data: {
            name: camera.name,
            home: {
                connect: {
                    id: camera.home_id
                }
            },
            username: camera.username,
            password: camera.password,
            camera_brand: {
                connect: {
                    id: camera.camera_brand_id
                }
            },
            ha_entity: camera.ha_entity_id ? {
                connect: {
                    id: camera.ha_entity_id
                }
            }: undefined,
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
            home: true,
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