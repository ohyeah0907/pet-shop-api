import { Home, Role } from "@prisma/client";

export type RoleHomeCreate = {
    role: Role,
    home: Home,
}

export type RoleHomeCreateAndUpdate = {
    roles: Role[],
    home: Home,
}

export type RoleHomeUpdate = {
    id: number;
    role?: Role,
    home?: Home,
}

export type RoleHomeSearch = {
    role?: Role,
    home?: Home,
}