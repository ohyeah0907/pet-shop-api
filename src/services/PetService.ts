import { ObjectState, Pet } from "@prisma/client";
import prisma from "../prisma";
import PetRepository from "../repositories/PetRepository"
import { PetCreate, PetSearch, PetUpdate } from "../dto/pet";

const service = {
    getSearch: async (search: PetSearch) => {
        return PetRepository.findAll(search);
    },
    getById: async (id: number) => {
        const pet = await PetRepository.findById(id);
        if (!pet) throw new Error("Không tìm thấy pet");
        return pet;
    },
    create: async (create: PetCreate) => {
        const pet: any = {
            id: 0,
            name: create.name,
            stock_quantity: create.stock_quantity,
            price: create.price,
            thumbnail_image: create.thumbnail_image,
            description_image: create.description_image,
            age: create.age,
            isMale: create.isMale,
            color: create.color,
            weight: create.weight,
            height: create.height,
            birth_date: create.birth_date,
            origin: create.origin,
            description: create.description,
            type_id: create.type.id,
        }
        const created = await PetRepository.save(pet);
        return created;
    },
    update: async (update: PetUpdate) => {
        const pet: any = await service.getById(update.id);

        if (update.name) {
            pet.name = update.name;
        }
        return await PetRepository.save(pet);
    },
    delete: async (id: number) => {
        const pet: any = await service.getById(id);
        pet.state = ObjectState.DELETED;
        pet.deleted_at = new Date();
        return !!(await PetRepository.save(pet));
    },


}

export default service;