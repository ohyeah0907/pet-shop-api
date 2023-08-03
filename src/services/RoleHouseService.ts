import RoleHouseRepository from "../repositories/RoleHouseRepository"
import houseService from "./HouseService"
import roleService from "./RoleService"
import { RoleHouseCreate, RoleHouseUpdate } from "../dto/role_house";
import { ObjectState } from "@prisma/client";
const service = {
    search: async (params: any) => {
        return RoleHouseRepository.findAll();
    },
    getById: async (id: number) => {
        const roleHouse = await RoleHouseRepository.findById(id);
        if (!roleHouse) throw new Error("Không tìm thấy roleHouse");
        return roleHouse;
    },
    create: async (create: RoleHouseCreate) => {
        const house = await houseService.getHouseById(create.house.id);
        const role = await roleService.getRoleById(create.role.id);
        const roleHouse: any = {
            id: 0,
            role_id: role.id,
            house_id: house.id,
        }
        return await RoleHouseRepository.save(roleHouse);
    },
    update: async (update: RoleHouseUpdate) => {
        const roleHouse: any = await service.getById(update.id);

        if (update.house) {
            const house = await houseService.getHouseById(update.house.id);
            roleHouse.house_id = house.id;
        }
        if (update.role) {
            const role = await roleService.getRoleById(update.role.id);
            roleHouse.role_id = role.id;
        }
        return await RoleHouseRepository.save(roleHouse);
    },
    delete: async (id: number) => {
        const roleHouse: any = await service.getById(id);
        roleHouse.state = ObjectState.DELETED;
        roleHouse.deleted_at = new Date();
        return !!(await RoleHouseRepository.save(roleHouse));
    }
}

export default service;