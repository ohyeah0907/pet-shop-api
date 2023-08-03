import { Device, RoleHouse } from "@prisma/client";

export type RoleDeviceCreate = {
    role_house: RoleHouse,
    device: Device,
    enabled: boolean,
}

export type RoleDeviceUpdate = {
    id: number;
    role_house?: RoleHouse,
    device?: Device,
    enabled?: boolean,
}