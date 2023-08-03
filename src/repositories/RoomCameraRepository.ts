import { RoomCamera, ObjectState } from "@prisma/client";
import prisma from "../prisma";
const findById = async (id: number) => {
    const roomCamera = await prisma.roomCamera.findUnique({
        include: {
            camera: true,
            room: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return roomCamera;
}

const findAll = async () => {
    const roomCameras = await prisma.roomCamera.findMany({
        include: {
            camera: true,
            room: true,
        },
        where: {
            NOT: {
                state: ObjectState.DELETED,
            }
        }
    });
    return roomCameras;
}
const save = async (roomCamera: RoomCamera) => {
    if (roomCamera.id) {
        return prisma.roomCamera.update({
            where: {
                id: roomCamera.id
            },
            data: {
                ordering: roomCamera.ordering,
                pinned: roomCamera.pinned,
                room: {
                    connect: {
                        id: roomCamera.room_id
                    }
                },
                camera: {
                    connect: {
                        id: roomCamera.camera_id
                    }
                },
                state: roomCamera.state,
                deleted_at: roomCamera.deleted_at,
            },
            include: {
                camera: true,
                room: true,
            }
        })
    }
    return prisma.roomCamera.create({
        data: {
            ordering: roomCamera.ordering,
            pinned: roomCamera.pinned,
            room: {
                connect: {
                    id: roomCamera.room_id
                }
            },
            camera: {
                connect: {
                    id: roomCamera.camera_id
                }
            },
        },
        include: {
            camera: true,
            room: true,
        }
    })
}

export default {
    save,
    findById,
    findAll,
}