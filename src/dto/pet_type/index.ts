import { Pet, PetType } from "@prisma/client";

export type PetTypeCreate = {
    name: String;
    parent?: PetType;
}

export type PetTypeUpdate = {
    id: number;
    name: String;
    parent?: PetType;
}

export type PetTypeSearch = {
    name: String;
    parent?: PetType;
}



