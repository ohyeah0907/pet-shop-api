import { Home, Role } from "@prisma/client";

export type RoleHomeCreate = {
    role: Role,
    home: Home,
}

export type RoleHomeUpdate = {
    id: number;
    role?: Role,
    home?: Home,
}