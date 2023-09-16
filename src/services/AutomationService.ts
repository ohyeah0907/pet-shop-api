import AutomationRepository from "../repositories/AutomationRepository"
import homeService from "./HomeService"
import haService from "./HAEntityService"
import { AutomationCreate, AutomationUpdate } from "../dto/automation";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return AutomationRepository.findAll();
    },
    getById: async (id: number) => {
        const automation = await AutomationRepository.findById(id);
        if (!automation) throw new Error("Không tìm thấy automation");
        return automation;
    },
    getByHomeIdAndEntityId: async (homeId: number, entity_id: string) => {
        const automation = await AutomationRepository.findByHomeIdAndEntityId(homeId, entity_id);
        if (!automation) throw new Error("Không tìm thấy automation");
        return automation;
    },
    create: async (create: AutomationCreate) => {
        const home = await homeService.getHomeById(create.home.id);
        const haEntity = await haService.getById(create.ha_entity.id);
        const automation: any = {
            id: 0,
            name: create.name,
            description: create.description,
            home_id: home.id,
            accessed_at: new Date(create.accessed_at),
            ha_entity_id: haEntity.id,
        }
        return await AutomationRepository.save(automation);
    },
    update: async (update: AutomationUpdate) => {
        const automation: any = await service.getById(update.id);

        if (update.name) {
            automation.name = update.name;
        }
        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            automation.home_id = home.id;
        }
        if (update.ha_entity) {
            const haEntity = await haService.getById(update.ha_entity.id);
            automation.entity_id = haEntity.entity_id;
        }
        if (update.description) {
            automation.description = update.description;
        }
        if (update.accessed_at) {
            automation.accessed_at = new Date(update.accessed_at)
        }
        return await AutomationRepository.save(automation);
    },
    delete: async (id: number) => {
        const automation: any = await service.getById(id);
        automation.state = ObjectState.DELETED;
        automation.deleted_at = new Date();
        return !!(await AutomationRepository.save(automation));
    }
}

export default service;