import { House } from "@prisma/client";

export type RoleCreate = {
    name: string;
    house: House;
    is_admin: boolean;
}

export type RoleUpdate = {
    id: number;
    name?: string;
    house?: House;
    is_owner?: boolean;
}