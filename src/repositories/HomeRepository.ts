import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { Home, ObjectState } from "@prisma/client";


const findAll = async () => {
    const homes = await prisma.home.findMany({
        include: {
            cameras: true,
            rooms: true,
            home_clouds: true,
            active_home_cloud: true,
            user_homes: true
        },
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return homes;
}

const findById = async (id: number) => {
    const home = await prisma.home.findUnique({
        include: {
            cameras: true,
            rooms: true,
            home_clouds: true,
            active_home_cloud: true,
            user_homes: true
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return home;
}

const findByIdQueryHomeInfo = async (id: number) => {
    const home = await prisma.home.findUnique({
        include: {
            cameras: true,
            rooms: true,
            home_clouds: true,
            active_home_cloud: true,
            user_homes: {
                include: {
                    user: true,
                    user_fcms: {
                    },
                    user_schedules: {
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
    return home;
}

const save = async (home: Home) => {
    if (home.id) {
        return await prisma.home.update({
            where: {
                id: home.id
            },
            data: {
                name: home.name,
                address: home.address,
                lan_ip: home.lan_ip,
                lan_port: home.lan_port,
                wan_port: home.wan_port,
                wan_domain: home.wan_domain,
                active_home_cloud_id: home.active_home_cloud_id,
                image_url: home.image_url,
                state: home.state,
                deleted_at: home.deleted_at,
            },
            include: {
                active_home_cloud: {
                    include: {
                        cloud: true,
                        home: true,
                    }
                },
            },
        });
    }
    return await prisma.home.create({
        data: {
            name: home.name,
            address: home.address,
            lan_ip: home.lan_ip,
            lan_port: home.lan_port,
            wan_port: home.wan_port,
            wan_domain: home.wan_domain,
            active_home_cloud: undefined,
            image_url: home.image_url,
        }
    });
}

export default {
    findAll,
    findById,
    findByIdQueryHomeInfo,
    save
}