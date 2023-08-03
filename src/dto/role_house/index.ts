import { House, Role } from "@prisma/client";

export type RoleHouseCreate = {
    role: Role,
    house: House,
}

export type RoleHouseUpdate = {
    id: number;
    role?: Role,
    house?: House,
}