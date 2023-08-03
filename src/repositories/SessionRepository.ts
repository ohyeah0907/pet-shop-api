import { Session, ObjectState } from "@prisma/client";
import prisma from "../prisma";

const findById = async (id: number) => {
    const session = await prisma.session.findUnique({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                }
            }
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return session;
}

const findAll = async () => {
    const sessions = await prisma.session.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            }
        },
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return sessions;
}

const save = async (session: Session) => {
    if (session.id) {
        return prisma.session.update({
            where: {
                id: session.id
            },
            data: {
                device: session.device,
                accessed_at: session.accessed_at,
                expired_at: session.expired_at,
                location: session.location,
                finger_print: session.finger_print,
                ip: session.ip,
                platform: session.platform,
                token: session.token,
                user: {
                    connect: {
                        id: session.user_id
                    }
                },
                user_agent: session.user_agent,
                state: session.state,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        phone: true,
                    }
                }
            }
        })
    }
    return prisma.session.create({
        data: {
            device: session.device,
            accessed_at: session.accessed_at,
            expired_at: session.expired_at,
            location: session.location,
            finger_print: session.finger_print,
            ip: session.ip,
            platform: session.platform,
            token: session.token,
            user: {
                connect: {
                    id: session.user_id
                }
            },
            user_agent: session.user_agent,
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                }
            }
        }
    })
}

export default {
    save,
    findById,
    findAll,
}