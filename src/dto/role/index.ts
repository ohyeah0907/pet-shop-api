
export type RoleCreate = {
    name: string;
}

export type RoleUpdate = {
    id: number;
    name?: string;
    is_owner?: boolean;
}