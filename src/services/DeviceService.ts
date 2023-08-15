import DeviceRepository from "../repositories/DeviceRepository"
import homeService from "./HomeService"
import presetService from "./PresetService"
import haEntityService from "./HAEntityService"
import { DeviceCreate, DeviceSearch, DeviceUpdate } from "../dto/device";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (search: DeviceSearch) => {
        return DeviceRepository.findAll(search);
    },
    getById: async (id: number) => {
        const device = await DeviceRepository.findById(id);
        if (!device) throw new Error("Không tìm thấy device");
        return device;
    },
    create: async (create: DeviceCreate) => {
        const home = await homeService.getHomeById(create.home.id);
        const preset = await presetService.getById(create.preset.id);
        const haEntity = await haEntityService.getByEntityId(create.ha_entity.entity_id)
        const device: any = {
            id: 0,
            name: create.name,
            home_id: home.id,
            ha_entity_id: haEntity.id,
            type: create.type,
            sub_type: create.sub_type,
            status: true,
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
        if (update.ha_entity) {
            device.ha_entity_id = update.ha_entity.id;
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