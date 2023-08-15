import HAEntityRepository from "../repositories/HAEntityRepository"
import { HAEntityCreate, HAEntitySearch, HAEntityUpdate } from "../dto/ha_entity";
import { ObjectState } from "@prisma/client";
import homeService from "./HomeService";

const service = {
    search: async (search: HAEntitySearch) => {
        return HAEntityRepository.findAll(search);
    },
    getById: async (id: number) => {
        const haEntity = await HAEntityRepository.findById(id);
        if (!haEntity) throw new Error("Không tìm thấy haEntity");
        return haEntity;
    },
    getByEntityId: async (entityId: string) => {
        const haEntity = await HAEntityRepository.findByEntityId(entityId);
        if (!haEntity) throw new Error("Không tìm thấy haEntity");
        return haEntity;
    },
    create: async (create: HAEntityCreate) => {
        const home = await homeService.getHomeById(create.home.id);
        const haEntity: any = {
            id: 0,
            name: create.name,
            description: create.description,
            entity_id: create.entity_id,
            home_id: home.id,
            accessed_at: new Date(),
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
        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            haEntity.home_id = home.id;
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