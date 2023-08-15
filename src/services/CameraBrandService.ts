import CameraBrandRepository from "../repositories/CameraBrandRepository"
import { CameraBrandCreate, CameraBrandUpdate } from "../dto/camera_brand";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (search: any) => {
        return CameraBrandRepository.findAll(search);
    },
    getById: async (id: number) => {
        const cameraBrand = await CameraBrandRepository.findById(id);
        if (!cameraBrand) throw new Error("Không tìm thấy cameraBrand");
        return cameraBrand;
    },
    create: async (create: CameraBrandCreate) => {
        const cameraBrand: any = {
            id: 0,
            name: create.name,
            url_pattern: create.url_pattern,
            preset_pattern: create.preset_pattern,

        }
        return await CameraBrandRepository.save(cameraBrand);
    },
    update: async (update: CameraBrandUpdate) => {
        const cameraBrand: any = await service.getById(update.id);

        if (update.name) {
            cameraBrand.name = update.name;
        }
        if(update.url_pattern) {
            cameraBrand.url_pattern = update.url_pattern;
        }
        if(update.preset_pattern) {
            cameraBrand.preset_pattern = update.preset_pattern;
        }
        
        return await CameraBrandRepository.save(cameraBrand);
    },
    delete: async (id: number) => {
        const cameraBrand: any = await service.getById(id);
        cameraBrand.state = ObjectState.DELETED;
        cameraBrand.deleted_at = new Date();
        return !!(await CameraBrandRepository.save(cameraBrand));
    }
}

export default service;