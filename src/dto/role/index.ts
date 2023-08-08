import { Home } from "@prisma/client";

export type RoleCreate = {
    name: string;
    home: Home;
    is_admin: boolean;
}

export type RoleUpdate = {
    id: number;
    name?: string;
    home?: Home;
    is_owner?: boolean;
}