import { HouseCloud } from "@prisma/client";

export type HouseCreate = {
    name: string;
    address: string;
    lan_ip: string;
    lan_port: number;
    wan_domain: string;
    wan_port: number;
    username: string;
    password: string;
    image_url: string;
}

export type HouseUpdate = {
    id: number;
    name?: string;
    address?: string;
    lan_ip?: string;
    lan_port?: number;
    remote_ip?: string;
    remote_port?: number;
    wan_ip?: string;
    wan_port?: number;
    username?: string;
    password?: string;
    image_url?: string;
    active_house_cloud?: HouseCloud;
}