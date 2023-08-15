import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { UserFCM, ObjectState, DeviceType } from "@prisma/client";


const findAll = async () => {
    const userFCMs = await prisma.userFCM.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userFCMs;
}

const findById = async (id: number) => {
    const userFCM = await prisma.userFCM.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return userFCM;
}

const save = async (userFCM: UserFCM) => {

    if (userFCM.id) {
        return await prisma.userFCM.update({
            where: {
                id: userFCM.id
            },
            data: {
                device_name: userFCM.device_name,
                app_name: userFCM.app_name,
                fcm_subcribe_id: userFCM.fcm_subcribe_id,
                other_info: userFCM.other_info,
                user_home: {
                    connect: {
                        id: userFCM.user_home_id
                    }
                },
                subcribe_date: userFCM.subcribe_date,
                state: userFCM.state,
                deleted_at: userFCM.deleted_at,
                updated_at: userFCM.updated_at,
            },
        });
    }
    return await prisma.userFCM.create({
        data: {
            device_name: userFCM.device_name,
                app_name: userFCM.app_name,
                fcm_subcribe_id: userFCM.fcm_subcribe_id,
                other_info: userFCM.other_info,
                user_home: {
                    connect: {
                        id: userFCM.user_home_id
                    }
                },
                subcribe_date: userFCM.subcribe_date,
        },
    });

}

export default {
    findAll,
    findById,
    save
}