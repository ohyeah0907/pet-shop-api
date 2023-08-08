import prisma from "../prisma"
import { Sensor, ObjectState } from "@prisma/client";


const findAll = async () => {
    const sensors = await prisma.sensor.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            home: true
        }
    });
    return sensors;
}

const findById = async (id: number) => {
    const sensor = await prisma.sensor.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            home: true
        }
    });
    return sensor;
}

const save = async (sensor: Sensor) => {

    if (sensor.id) {
        return await prisma.sensor.update({
            where: {
                id: sensor.id
            },
            data: {
                name: sensor.name,
                home: {
                    connect: {
                        id: sensor.home_id
                    }
                },
                entity_id: sensor.entity_id,
                state: sensor.state,
                deleted_at: sensor.deleted_at,
                updated_at: sensor.updated_at,
            },
            include: {
                home: true
            }
        });
    }
    return await prisma.sensor.create({
        data: {
            name: sensor.name,
            home: {
                connect: {
                    id: sensor.home_id
                }
            },
            entity_id: sensor.entity_id,
        },
        include: {
            home: true
        }
    });

}

export default {
    findAll,
    findById,
    save
}