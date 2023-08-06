import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { House, ObjectState } from "@prisma/client";


const findAll = async () => {
    const houses = await prisma.house.findMany({
        include: {
            roles: true,
            cameras: true,
            rooms: true,
            house_clouds: true,
            active_house_cloud: true,
            role_houses: true
        },
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return houses;
}

const findById = async (id: number) => {
    const house = await prisma.house.findUnique({
        include: {
            roles: true,
            cameras: true,
            rooms: true,
            house_clouds: true,
            active_house_cloud: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return house;
}

const findByIdQueryHouseInfo = async (id: number) => {
    const house = await prisma.house.findUnique({
        include: {
            roles: true,
            cameras: true,
            rooms: true,
            house_clouds: true,
            active_house_cloud: true,
            role_houses: {
                include: {
                    role: true,
                    role_devices: {
                        include: {
                            device: true,
                        }
                    },
                    role_schedules: {
                        include: {
                            schedule_weeks: {
                                include: {
                                    schedule_hours: true,
                                }
                            }
                        }
                    }
                }
            }
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return house;
}

const save = async (house: House) => {
    if (house.id) {
        return await prisma.house.update({
            where: {
                id: house.id
            },
            data: {
                name: house.name,
                address: house.address,
                lan_ip: house.lan_ip,
                lan_port: house.lan_port,
                wan_port: house.wan_port,
                wan_domain: house.wan_domain,
                active_house_cloud_id: house.active_house_cloud_id,
                image_url: house.image_url,
                state: house.state,
                deleted_at: house.deleted_at,
            },
            include: {
                roles: true,
                active_house_cloud: {
                    include: {
                        cloud: true,
                        house: true,
                    }
                },
            },
        });
    }
    return await prisma.house.create({
        data: {
            name: house.name,
            address: house.address,
            lan_ip: house.lan_ip,
            lan_port: house.lan_port,
            wan_port: house.wan_port,
            wan_domain: house.wan_domain,
            active_house_cloud: undefined,
            image_url: house.image_url,
        }
    });
}

export default {
    findAll,
    findById,
    findByIdQueryHouseInfo,
    save
}