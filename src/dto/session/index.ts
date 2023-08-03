import { User } from "@prisma/client";

export type SessionCreate = {
    user: User,
    token: string,
    ip: string,
    location: string,
    user_agent: string,
    device: string,
    platform: string,
    finger_print: string,
    expired_at: Date,
    accessed_at: Date,
}
export type SessionUpdate = {
    id: number,
    user?: User,
    token?: string,
    ip?: string,
    location?: string,
    user_agent?: string,
    device?: string,
    platform?: string,
    finger_print?: string,
    expired_at?: Date,
    accessed_at?: Date,
}