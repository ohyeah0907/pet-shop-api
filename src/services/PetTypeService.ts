import { ObjectState, PetType } from "@prisma/client";
import prisma from "../prisma";
import PetTypeRepository from "../repositories/PetTypeRepository"
import { PetTypeCreate, PetTypeSearch, PetTypeUpdate } from "../dto/pet_type";

const service = {
    getSearch: async (search: PetTypeSearch) => {
        return PetTypeRepository.findAll(search);
    },
    getById: async (id: number) => {
        const pet = await PetTypeRepository.findById(id);
        if (!pet) throw new Error("Không tìm thấy pet");
        return pet;
    },
    create: async (create: PetTypeCreate) => {
        let parent: any = null;
        if (create.parent) {
            parent = await service.getById(create.parent!.id);
        }
        const pet: any = {
            id: 0,
            name: create.name,
            parent_id: parent? parent.id : null,
        }
        
        const created = await PetTypeRepository.save(pet);
        return created;
    },
    update: async (update: PetTypeUpdate) => {
        const pet: any = await service.getById(update.id);

        if (update.name) {
            pet.name = update.name;
        }
        if (update.parent) {
            const parent = await service.getById(update.parent!.id);
            pet.parent_id = parent.id;
        }
        return await PetTypeRepository.save(pet);
    },
    delete: async (id: number) => {
        const pet: any = await service.getById(id);
        pet.state = ObjectState.DELETED;
        pet.deleted_at = new Date();
        return !!(await PetTypeRepository.save(pet));
    },


}

export default service;