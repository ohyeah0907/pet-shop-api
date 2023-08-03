import HAEntityRepository from "../repositories/HAEntityRepository"
import { HAEntityCreate, HAEntityUpdate } from "../dto/ha_entity";
import { ObjectState } from "@prisma/client";
import houseService from "./HouseService";

const service = {
    search: async (params: any) => {
        return HAEntityRepository.findAll();
    },
    getById: async (id: number) => {
        const haEntity = await HAEntityRepository.findById(id);
        if (!haEntity) throw new Error("Không tìm thấy haEntity");
        return haEntity;
    },
    create: async (create: HAEntityCreate) => {
        const house = await houseService.getHouseById(create.house.id);
        const haEntity: any = {
            id: 0,
            name: create.name,
            description: create.description,
            entity_id: create.entity_id,
            house_id: house.id,
            accessed_at: new Date(create.accessed_at),
        }
        return await HAEntityRepository.save(haEntity);
    },
    update: async (update: HAEntityUpdate) => {
        const haEntity: any = await service.getById(update.id);

        if (update.name) {
            haEntity.name = update.name;
        }
        if (update.description) {
            haEntity.description = update.description;
        }
        if (update.entity_id) {
            haEntity.entity_id = update.entity_id;
        }
        if (update.house) {
            const house = await houseService.getHouseById(update.house.id);
            haEntity.house_id = house.id;
        }
        if (update.accessed_at) {
            haEntity.accessed_at = new Date(update.accessed_at);
        }
        return await HAEntityRepository.save(haEntity);
    },
    delete: async (id: number) => {
        const haEntity: any = await service.getById(id);
        haEntity.state = ObjectState.DELETED;
        haEntity.deleted_at = new Date();
        return !!(await HAEntityRepository.save(haEntity));
    }
}

export default service;