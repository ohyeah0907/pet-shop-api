import DeviceTypeRepository from "../repositories/DeviceTypeRepository"
import { DeviceTypeCreate, DeviceTypeSearch, DeviceTypeUpdate } from "../dto/device_type";
import { DeviceTypeCode, ObjectState } from "@prisma/client";

const service = {
    search: async (search: DeviceTypeSearch) => {
        return DeviceTypeRepository.findAll(search);
    },
    getById: async (id: number) => {
        const deviceType = await DeviceTypeRepository.findById(id);
        if (!deviceType) throw new Error("Không tìm thấy deviceType");
        return deviceType;
    },
    getByCode: async (code: DeviceTypeCode) => {
        const deviceType = await DeviceTypeRepository.findByCode(code);
        if (!deviceType) throw new Error("Không tìm thấy deviceType");
        return deviceType;
    },
    create: async (create: DeviceTypeCreate) => {
        const deviceType: any = {
            id: 0,
            name: create.name,
            code: create.code,
        }
        return await DeviceTypeRepository.save(deviceType);
    },
    update: async (update: DeviceTypeUpdate) => {
        const deviceType: any = await service.getById(update.id);

        if (update.name) {
            deviceType.name = update.name;
        }
        if (update.code) {
            deviceType.code = update.code;
        }

        return await DeviceTypeRepository.save(deviceType);
    },
    delete: async (id: number) => {
        const deviceType: any = await service.getById(id);
        deviceType.state = ObjectState.DELETED;
        deviceType.deleted_at = new Date();
        return !!(await DeviceTypeRepository.save(deviceType));
    }
}

export default service;