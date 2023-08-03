import { SessionCreate, SessionUpdate } from "../dto/session";
import { ObjectState } from "@prisma/client";
import SessionRepository from "../repositories/SessionRepository";
import userService from "./UserService";


const service = {
    search: async (params: any) => {
        return SessionRepository.findAll();
    },
    getById: async (id: number) => {
        const session = await SessionRepository.findById(id);
        if (!session) throw new Error("Không tìm thấy session");
        return session;
    },
    create: async (create: SessionCreate) => {
        const user = await userService.getUserById(create.user.id);
        const session: any = {
            id: 0,
            device: create.device,
            accessed_at: new Date(create.accessed_at),
            expired_at: new Date(create.expired_at),
            finger_print: create.finger_print,
            location: create.location,
            ip: create.ip,
            platform: create.platform,
            token: create.token,
            user_id: user.id,
            user_agent: create.user_agent,
        }
        return await SessionRepository.save(session);
    },
    update: async (update: SessionUpdate) => {
        const session: any = await service.getById(update.id);
        if(update.device) {
            session.device = update.device;
        }
        if(update.accessed_at) {
            session.accessed_at = update.accessed_at;
        }
        if(update.expired_at) {
            session.expired_at = update.expired_at;
        }
        if(update.finger_print) {
            session.finger_print = update.finger_print;
        }
        if(update.location) {
            session.location = update.location;
        }
        if(update.ip) {
            session.ip = update.ip;
        }
        if(update.platform) {
            session.platform = update.platform;
        }
        if(update.token) {
            session.token = update.token;
        }
        if(update.user_agent) {
            session.user_agent = update.user_agent;
        }
        if(update.user) {
            const user = await userService.getUserById(update.user.id);
            session.user_id = user.id;
        }
        return await SessionRepository.save(session);
    },
    delete: async (id: number) => {
        const session: any = await service.getById(id);
        session.state = ObjectState.DELETED;
        return await SessionRepository.save(session);
    }

}

export default service;