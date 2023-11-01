import { Pet, PetType } from "@prisma/client";

export type PetCreate = {
    name: string;
    stock_quantity: number;
    price: number;
    thumbnail_image: string;
    description_image: string[];
    age: number;
    isMale: boolean;
    color: string;
    weight: number;
    height: number;
    birth_date: Date;
    origin: string;
    description: string;
    type: PetType;

}

export type PetUpdate = {
    id: number;
    name: string;
    stock_quantity: number;
    price: number;
    thumbnail_image: string;
    description_image: string[];
    age: number;
    isMale: boolean;
    color: string;
    weight: number;
    height: number;
    birth_date: Date;
    origin: string;
    description: string;
    type: PetType;
}

export type PetSearch = {
    name: string;
    type: PetType;
}



