import { Cloud, House, HouseCloud } from "@prisma/client"

export type HouseCloudCreate = {
    house: House,
    cloud: Cloud,
    cloud_port: number,
    vpn_ip: string,
    private_key: string,
    public_key: string,
    pre_shared_key: string,
}

export type HouseCloudUpdate = {
    id: number,
    house: House,
    cloud: Cloud,
    cloud_port: number,
    vpn_ip: string,
    private_key: string,
    public_key: string,
    pre_shared_key: string,
}