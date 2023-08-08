import { Cloud, Home, HomeCloud } from "@prisma/client"

export type HomeCloudCreate = {
    home: Home,
    cloud: Cloud,
    cloud_port: number,
    vpn_ip: string,
    private_key: string,
    public_key: string,
    pre_shared_key: string,
}

export type HomeCloudUpdate = {
    id: number,
    home: Home,
    cloud: Cloud,
    cloud_port: number,
    vpn_ip: string,
    private_key: string,
    public_key: string,
    pre_shared_key: string,
}