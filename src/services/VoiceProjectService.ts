import VoiceProjectRepository from "../repositories/VoiceProjectRepository"
import { VoiceProjectCreate, VoiceProjectUpdate } from "../dto/voice_project";
import { ObjectState } from "@prisma/client";
import crypto from "crypto";
import { generateClientId, generateSecret } from "../utils";
import UserRepository from "../repositories/UserRepository";

const service = {
    search: async (params: any) => {
        return VoiceProjectRepository.findAll();
    },
    getById: async (id: number) => {
        const voiceProject = await VoiceProjectRepository.findById(id);
        if (!voiceProject) throw new Error("Không tìm thấy voiceProject");
        return voiceProject;
    },
    verifyCredentials: async (username: string, password: string) => {
        const userVoice = await UserRepository.findByVoiceUsername(username);
        //jason.n
        if (!userVoice) throw new Error("Không tìm thấy voiceProject");
        //kiểm tra password -- jason.n
        return userVoice;
    },
    getByClientIdAndRedirectUrl: async (client_id: string, redirect_uri: string) => {
        
        const voiceProject = await VoiceProjectRepository.findByClientIdAndRedirectUrl(client_id, redirect_uri);
        if (!voiceProject) throw new Error(`Không tìm thấy voiceProject với client_id: ${client_id} và redirect_uri: ${redirect_uri}`);
        return voiceProject;

    },
    getByClientIdAndRedirectUrlAndClientSecret: async (client_id: string, redirect_uri: string, client_secret: string) => {
        const voiceProject = await VoiceProjectRepository.findByClientIdAndRedirectUrlAndClientSecret(client_id, redirect_uri, client_secret);
        if (!voiceProject) throw new Error(`Không tìm thấy voiceProject với client_id: ${client_id} và redirect_uri: ${redirect_uri} và client_secret: ${client_secret}`);
        return voiceProject;
    },
    create: async (create: VoiceProjectCreate) => {
        const voiceProject: any = {
            id: 0,
            name: create.name,
            client_id: generateClientId(32),
            project_id: create.project_id,
            client_secret: generateSecret(24),
            redirect_uris: create.redirect_uris,
        }
        return await VoiceProjectRepository.save(voiceProject);
    },
    update: async (update: VoiceProjectUpdate) => {
        const voiceProject: any = await service.getById(update.id);

        if (update.name) {
            voiceProject.name = update.name;
        }
        if (update.client_id) {
            voiceProject.client_id = update.client_id;
        }
        if (update.project_id) {
            voiceProject.project_id = update.project_id;
        }
        if (update.client_secret) {
            voiceProject.client_secret = update.client_secret;
        }
        if (update.redirect_uris) {
            voiceProject.redirect_uris = update.redirect_uris;
        }
        return await VoiceProjectRepository.save(voiceProject);
    },
    delete: async (id: number) => {
        const voiceProject: any = await service.getById(id);
        voiceProject.state = ObjectState.DELETED;
        voiceProject.deleted_at = new Date();
        return !!(await VoiceProjectRepository.save(voiceProject));
    }
}

export default service;