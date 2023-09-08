import { Home, HomeCloud, Language, User, UserHome } from "@prisma/client";

export type HomeCreate = {
    name: string;
    address: string;
    lan_ip: string;
    lan_port: number;
    wan_domain: string;
    wan_port: number;
    image_url: string;
}

export type HomeUpdate = {
    id: number;
    name?: string;
    address?: string;
    lan_ip?: string;
    lan_port?: number;
    wan_domain?: string;
    wan_port?: number;
    image_url?: string;
    active_home_cloud?: HomeCloud;
}

export type HomeRoleUserCreate = {
    home: Home,
    user: User,
    ha_username: string,
    ha_password: string,
}

export type HomeRoleUserUpdate = {
    home: Home,
    user_home: UserHome,
    user?: User,
    ha_username?: string,
    ha_password?: string,
}

export type HomeTranslationCreate = {
    home: Home,
    language: Language,
    name: string,
    address: string,
}

export type HomeTranslationUpdate = {
    id: number,
    home?: Home,
    language?: Language,
    name?: string,
    address?: string,
}

export type HomeTranslationSearch = {
    home?: Home,
    language?: Language,
}

