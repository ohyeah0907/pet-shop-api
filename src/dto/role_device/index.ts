import { Device, RoleHome } from "@prisma/client";

export type RoleDeviceCreate = {
    role_home: RoleHome,
    device: Device,
    enabled: boolean,
}

export type RoleDeviceUpdate = {
    id: number;
    role_home?: RoleHome,
    device?: Device,
    enabled?: boolean,
}