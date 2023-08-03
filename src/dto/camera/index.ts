import { CameraBrand, House } from "@prisma/client"

export type CameraCreate = {
    house: House,
    name: string,
    username: string,
    password: string,
    camera_brand: CameraBrand,
    lan_ip: string,
    lan_port: number,
    lan_uri: string,
    wan_ip: string,
    wan_port: number,
    wan_uri: string,
    cloud_domain: string,
    cloud_port: number,
    cloud_uri: string,
}

export type CameraUpdate = {
    id: number,
    house?: House,
    camera_brand?: CameraBrand,
    name?: string,
    username: string,
    password: string,
    lan_ip?: string,
    lan_port?: number,
    lan_uri?: string,
    wan_ip?: string,
    wan_port?: number,
    wan_uri?: string,
    cloud_domain?: string,
    cloud_port?: number,
    cloud_uri?: string,
}