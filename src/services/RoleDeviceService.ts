import roleDeviceRepository from "../repositories/RoleDeviceRepository"
import deviceService from "./DeviceService"
import roleHouseService from "./RoleHouseService"
import { RoleDeviceCreate, RoleDeviceUpdate } from "../dto/role_device";
import { ObjectState } from "@prisma/client";
const service = {
    search: async (params: any) => {
        return roleDeviceRepository.findAll();
    },
    getById: async (id: number) => {
        const roleDevice = await roleDeviceRepository.findById(id);
        if (!roleDevice) throw new Error("Không tìm thấy roleDevice");
        return roleDevice;
    },
    create: async (create: RoleDeviceCreate) => {
        const device = await deviceService.getById(create.device.id);
        const rolehouse = await roleHouseService.getById(create.role_house.id);
        const roleDevice: any = {
            id: 0,
            role_house_id: rolehouse.id,
            device_id: device.id,
            enabled: create.enabled,
        }
        return await roleDeviceRepository.save(roleDevice);
    },
    update: async (update: RoleDeviceUpdate) => {
        const roleDevice: any = await service.getById(update.id);

        if (update.device) {
            const device = await deviceService.getById(update.device.id);
            roleDevice.device_id = device.id;
        }
        if (update.role_house) {
            const roleHouse = await roleHouseService.getById(update.role_house.id);
            roleDevice.role_house_id = roleHouse.id;
        }
        if(update.enabled != null) {
            roleDevice.enable = update.enabled;
        }
        return await roleDeviceRepository.save(roleDevice);
    },
    delete: async (id: number) => {
        const roleDevice: any = await service.getById(id);
        roleDevice.state = ObjectState.DELETED;
        roleDevice.deleted_at = new Date();
        return !!(await roleDeviceRepository.save(roleDevice));
    }
}

export default service;