import FilterRepository from "../repositories/FilterRepository"
import { FilterCreate, FilterUpdate } from "../dto/filter";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return FilterRepository.findAll();
    },
    getById: async (id: number) => {
        const filter = await FilterRepository.findById(id);
        if (!filter) throw new Error("Không tìm thấy filter");
        return filter;
    },
    create: async (create: FilterCreate) => {
        const filter: any = {
            id: 0,
            name: create.name,
            icon: create.icon,
            device_type: create.device_type,
            background_off: create.background_off,
            background_on: create.background_on,
            color_off: create.color_off,
            color_on: create.color_on,
        }
        return await FilterRepository.save(filter);
    },
    update: async (update: FilterUpdate) => {
        const filter: any = await service.getById(update.id);

        if (update.name) {
            filter.name = update.name;
        }
        if(update.device_type) {
            filter.device_type = update.device_type;
        }
        if(update.icon) {
            filter.icon = update.icon;
        }
        if(update.background_off) {
            filter.background_off = update.background_off;
        }
        if(update.background_on) {
            filter.background_on = update.background_on;
        }
        if(update.color_off) {
            filter.color_off = update.color_off;
        }
        if(update.color_on) {
            filter.color_on = update.color_on;
        }
        
        return await FilterRepository.save(filter);
    },
    delete: async (id: number) => {
        const filter: any = await service.getById(id);
        filter.state = ObjectState.DELETED;
        filter.deleted_at = new Date();
        return !!(await FilterRepository.save(filter));
    }
}

export default service;