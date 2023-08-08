import DeviceRepository from "../repositories/DeviceRepository"
import homeService from "./HomeService"
import presetService from "./PresetService"
import { DeviceCreate, DeviceUpdate } from "../dto/device";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return DeviceRepository.findAll();
    },
    getById: async (id: number) => {
        const device = await DeviceRepository.findById(id);
        if (!device) throw new Error("Không tìm thấy device");
        return device;
    },
    create: async (create: DeviceCreate) => {
        const home = await homeService.getHomeById(create.home.id);
        const preset = await presetService.getById(create.preset.id);
        const device: any = {
            id: 0,
            name: create.name,
            home_id: home.id,
            entity_id: create.entity_id,
            type: create.type,
            sub_type: create.sub_type,
            status: create.status,
            attributes: create.attributes,
            description: create.description,
            preset_id: preset.id,
        }
        return await DeviceRepository.save(device);
    },
    update: async (update: DeviceUpdate) => {
        const device: any = await service.getById(update.id);

        if (update.name) {
            device.name = update.name;
        }
        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            device.home_id = home.id;
        }
        if (update.entity_id) {
            device.entity_id = update.entity_id;
        }
        if (update.type) {
            device.type = update.type;
        }
        if (update.sub_type) {
            device.sub_type = update.sub_type;
        }
        if (update.status != null) {
            device.status = update.status;
        }
        if (update.attributes) {
            device.attributes = update.attributes;
        }
        if (update.preset) {
            const preset = await presetService.getById(update.preset.id);
            device.preset_id = preset.id;
        }
        if (update.description) {
            device.description = update.description;
        }

        return await DeviceRepository.save(device);
    },
    delete: async (id: number) => {
        const device: any = await service.getById(id);
        device.state = ObjectState.DELETED;
        device.deleted_at = new Date();
        return !!(await DeviceRepository.save(device));
    }
}

export default service;