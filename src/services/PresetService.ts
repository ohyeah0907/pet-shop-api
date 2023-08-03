import PresetRepository from "../repositories/PresetRepository"
import { PresetCreate, PresetUpdate } from "../dto/preset";
import { ObjectState } from "@prisma/client";
import cameraService from "./CameraService";

const service = {
    search: async (params: any) => {
        return PresetRepository.findAll();
    },
    getById: async (id: number) => {
        const preset = await PresetRepository.findById(id);
        if (!preset) throw new Error("Không tìm thấy preset");
        return preset;
    },
    create: async (create: PresetCreate) => {
        const camera = await cameraService.getById(create.camera.id);
        const preset: any = {
            id: 0,
            name: create.name,
            url: create.url,
            camera_id: camera.id,
        }
        return await PresetRepository.save(preset);
    },
    update: async (update: PresetUpdate) => {
        const preset: any = await service.getById(update.id);

        if (update.name) {
            preset.name = update.name;
        }
        if(update.camera) {
            const camera = await cameraService.getById(update.camera.id);
            preset.camera_id = camera.id;
        }
        if(update.url) {
            preset.url = update.url;
        }
        
        return await PresetRepository.save(preset);
    },
    delete: async (id: number) => {
        const preset: any = await service.getById(id);
        preset.state = ObjectState.DELETED;
        preset.deleted_at = new Date();
        return !!(await PresetRepository.save(preset));
    }
}

export default service;