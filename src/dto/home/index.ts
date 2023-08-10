import { Home, HomeCloud, Role, User } from "@prisma/client";

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
    role: Role,
    user: User,
    ha_username: string,
    ha_password: string,
}