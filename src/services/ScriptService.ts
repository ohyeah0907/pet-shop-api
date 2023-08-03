import ScriptRepository from "../repositories/ScriptRepository"
import houseService from "./HouseService"
import userService from "./UserService"
import { ScriptCreate, ScriptUpdate } from "../dto/script";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return ScriptRepository.findAll();
    },
    getById: async (id: number) => {
        const script = await ScriptRepository.findById(id);
        if (!script) throw new Error("Không tìm thấy script");
        return script;
    },
    create: async (create: ScriptCreate) => {
        const house = await houseService.getHouseById(create.house.id);
        const script: any = {
            id: 0,
            name: create.name,
            house_id: house.id,
            entity_id: create.entity_id,
            description: create.description,
            accessed_at: new Date(create.accessed_at)
        }
        return await ScriptRepository.save(script);
    },
    update: async (update: ScriptUpdate) => {
        const script: any = await service.getById(update.id);

        if (update.name) {
            script.name = update.name;
        }
        if (update.house) {
            const house = await houseService.getHouseById(update.house.id);
            script.house_id = house.id;
        }
        if (update.entity_id) {
            script.entity_id = update.entity_id;
        }
        if (update.description) {
            script.description = update.description;
        }
        if(update.accessed_at){
            script.accessed_at = new Date(update.accessed_at);
        }
        return await ScriptRepository.save(script);
    },
    delete: async (id: number) => {
        const script: any = await service.getById(id);
        script.state = ObjectState.DELETED;
        script.deleted_at = new Date();
        return !!(await ScriptRepository.save(script));
    }
}

export default service;