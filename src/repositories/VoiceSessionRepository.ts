import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { VoiceSession, ObjectState, DeviceType } from "@prisma/client";


const findAll = async () => {
    const voiceSessions = await prisma.voiceSession.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        },
        include: {
            voice_project: true
        }
    });
    return voiceSessions;
}

const findById = async (id: number) => {
    const voiceSession = await prisma.voiceSession.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }, include: {
            voice_project: true
        }
    });
    return voiceSession;
}

const save = async (voiceSession: VoiceSession) => {

    if (voiceSession.id) {
        return await prisma.voiceSession.update({
            where: {
                id: voiceSession.id
            },
            data: {
                access_token: voiceSession.access_token,
                expired_at: voiceSession.expired_at,
                refresh_token: voiceSession.refresh_token,
                voice_project: { connect: { id: voiceSession.voice_project_id } },
                state: voiceSession.state,
                deleted_at: voiceSession.deleted_at,
                updated_at: voiceSession.updated_at,
            },
        });
    }
    return await prisma.voiceSession.create({
        data: {
            access_token: voiceSession.access_token,
            expired_at: voiceSession.expired_at,
            refresh_token: voiceSession.refresh_token,
            voice_project: { connect: { id: voiceSession.voice_project_id } },
        },
    });

}

export default {
    findAll,
    findById,
    save
}