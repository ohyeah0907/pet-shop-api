import roleDeviceRepository from "../repositories/RoleDeviceRepository"
import deviceService from "./DeviceService"
import roleHomeService from "./RoleHomeService"
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
        const rolehome = await roleHomeService.getById(create.role_home.id);
        const roleDevice: any = {
            id: 0,
            role_home_id: rolehome.id,
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
        if (update.role_home) {
            const roleHome = await roleHomeService.getById(update.role_home.id);
            roleDevice.role_home_id = roleHome.id;
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