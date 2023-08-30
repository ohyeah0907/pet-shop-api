import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { VoiceProject, ObjectState, DeviceType } from "@prisma/client";


const findAll = async (search: any) => {
    const condition = {
        NOT: {
            state: ObjectState.DELETED
        }
    }
    const voiceProjects = await prisma.voiceProject.findMany({
        where: condition
    });
    return voiceProjects;
}

const findById = async (id: number) => {
    const voiceProject = await prisma.voiceProject.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return voiceProject;
}

const findByClientIdAndRedirectUrl = async (client_id: string, redirect_uri: string) => {
    const voiceProject = await prisma.voiceProject.findFirst({
        where: {
            client_id: client_id,
            NOT: {
                state: ObjectState.DELETED
            },
            redirect_uris: {
                has: redirect_uri
            }
        }
    });
    return voiceProject;
}
const findByClientIdAndRedirectUrlAndClientSecret = async (client_id: string, redirect_uri: string, client_secret: string) => {
    const voiceProject = await prisma.voiceProject.findFirst({
        where: {
            client_id: client_id,
            AND: {
                
                client_secret: client_secret,
            },
            NOT: {
                state: ObjectState.DELETED
            },
            redirect_uris: {
                has: redirect_uri
            }
        }
    });
    return voiceProject;
}

const findByClientId = async (client_id: string) => {
    const voiceProject = await prisma.voiceProject.findUnique({
        where: {
            client_id: client_id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return voiceProject;
}

const save = async (voiceProject: VoiceProject) => {

    if (voiceProject.id) {
        return await prisma.voiceProject.update({
            where: {
                id: voiceProject.id
            },
            data: {
                name: voiceProject.name,
                client_id: voiceProject.client_id,
                client_secret: voiceProject.client_secret,
                project_id: voiceProject.project_id,
                redirect_uris: voiceProject.redirect_uris,
                state: voiceProject.state,
                deleted_at: voiceProject.deleted_at,
                updated_at: voiceProject.updated_at,
            },
        });
    }
    return await prisma.voiceProject.create({
        data: {
            name: voiceProject.name,
            client_id: voiceProject.client_id,
            client_secret: voiceProject.client_secret,
            project_id: voiceProject.project_id,
            redirect_uris: voiceProject.redirect_uris,
        },
    });

}

export default {
    findAll,
    findById,
    findByClientId,
    findByClientIdAndRedirectUrl,
    findByClientIdAndRedirectUrlAndClientSecret,
    save
}