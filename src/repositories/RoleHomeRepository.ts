import { RoleHome, ObjectState } from "@prisma/client";
import prisma from "../prisma";
import { RoleHomeSearch } from "../dto/role_home";
const findById = async (id: number) => {
    const roleHome = await prisma.roleHome.findUnique({
        include: {
            home: true,
            role: true,
            user_homes: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return roleHome;
}

const findByRoleIdAndHomeId = async (homeId: number, roleId: number) => {
    const roleHome = await prisma.roleHome.findFirst({
        where: {
            NOT: {
                state: ObjectState.DELETED
            },
            role_id: roleId,
            home_id: homeId,
        }
    });
    return roleHome;
}

const findAll = async (search: RoleHomeSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        },
    }

    if (search.home?.id) {
        condition['home_id'] = search.home?.id
    }
    if (search.role?.id) {
        condition['role_id'] = search.role?.id
    }

    const roleHomes = await prisma.roleHome.findMany({
        include: {
            home: true,
            role: true,
            user_homes: true,
        },
        where: {
            ...condition
        }
    });
    return roleHomes;
}
const save = async (roleHome: RoleHome) => {
    if (roleHome.id) {
        return prisma.roleHome.update({
            where: {
                id: roleHome.id
            },
            data: {
                role: {
                    connect: {
                        id: roleHome.role_id
                    }
                },
                home: {
                    connect: {
                        id: roleHome.home_id
                    }
                },
                state: roleHome.state,
                deleted_at: roleHome.deleted_at,
            },
            include: {
                home: true,
                role: true,
            }
        })
    }
    return prisma.roleHome.create({
        data: {
            role: {
                connect: {
                    id: roleHome.role_id
                }
            },
            home: {
                connect: {
                    id: roleHome.home_id
                }
            },
        },
        include: {
            home: true,
            role: true,
        },
    })
}

const createMany = async (roleHomes: RoleHome[]) => {
    return prisma.$transaction(
        roleHomes.map(roleHome => {
            return prisma.roleHome.create({
                data: {
                    role: {
                        connect: {
                            id: roleHome.role_id
                        }
                    },
                    home: {
                        connect: {
                            id: roleHome.home_id
                        }
                    },
                    state: ObjectState.ACTIVE,
                },
            })
        })
    )
}

const updateMany = async (roleHomes: RoleHome[]) => {
    return prisma.$transaction(
        roleHomes.map(roleHome => {
            return prisma.roleHome.update({
                where: {
                    id: roleHome.id
                },
                data: {
                    role: {
                        connect: {
                            id: roleHome.role_id
                        }
                    },
                    home: {
                        connect: {
                            id: roleHome.home_id
                        }
                    },
                    state: roleHome.state,
                    deleted_at: roleHome.deleted_at,
                },
            })
        })
    )
}

const deleteAll = async (homeId: number) => {
    return prisma.roleHome.updateMany({
        data: {
            state: ObjectState.DELETED,
            deleted_at: new Date(),
        },
        where: {
            home_id: homeId,
        }
    })
}

export default {
    save,
    findById,
    findByRoleIdAndHomeId,
    findAll,
    updateMany,
    createMany,
    deleteAll,
}