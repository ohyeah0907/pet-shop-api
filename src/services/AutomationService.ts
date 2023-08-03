import AutomationRepository from "../repositories/AutomationRepository"
import houseService from "./HouseService"
import userService from "./UserService"
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
    create: async (create: AutomationCreate) => {
        const house = await houseService.getHouseById(create.house.id);
        const automation: any = {
            id: 0,
            name: create.name,
            description: create.description,
            house_id: house.id,
            accessed_at: new Date(create.accessed_at),
            entity_id: create.entity_id,
        }
        return await AutomationRepository.save(automation);
    },
    update: async (update: AutomationUpdate) => {
        const automation: any = await service.getById(update.id);

        if (update.name) {
            automation.name = update.name;
        }
        if (update.house) {
            const house = await houseService.getHouseById(update.house.id);
            automation.house_id = house.id;
        }
        if (update.entity_id) {
            automation.entity_id = update.entity_id;
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