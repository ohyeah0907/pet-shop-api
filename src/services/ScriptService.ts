import ScriptRepository from "../repositories/ScriptRepository"
import homeService from "./HomeService"
import haService from "./HAEntityService"
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
    getByHomeIdAndId: async (homeId: number, entity_id: string) => {
        const script = await ScriptRepository.findByHomeIdAndEntityId(homeId, entity_id);
        if (!script) throw new Error("Không tìm thấy script");
        return script;
    },
    create: async (create: ScriptCreate) => {
        const home = await homeService.getHomeById(create.home.id);
        const haEntity = await haService.getById(create.ha_entity.id);
        const script: any = {
            id: 0,
            name: create.name,
            home_id: home.id,
            ha_entity_id: haEntity.id,
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
        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            script.home_id = home.id;
        }
        if (update.ha_entity) {
            const haEntity = await haService.getById(update.ha_entity.id);
            script.ha_entity_id = haEntity.entity_id;
        }
        if (update.description) {
            script.description = update.description;
        }
        if (update.accessed_at) {
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