import { Role } from "@prisma/client";
import { BadRequestResponse, NotFoundResponse } from "../handler/app-response";
import prisma from "../prisma";
import roleRepository from "../repositories/RoleRepository"
import houseService from "./HouseService"
import { RoleCreate, RoleUpdate } from "../dto/role";
import { ObjectState } from "@prisma/client";
const service = {
    getRoleSearch: async (params: any) => {
        return roleRepository.findAll();
    },
    getRoleById: async (id: number) => {
        const role = await roleRepository.findById(id);
        if (!role) throw new Error("Không tìm thấy role");
        return role;
    },
    createRole: async (create: RoleCreate) => {
        const house = await houseService.getHouseById(create.house.id);
        const role: any = {
            id: 0,
            name: create.name,
            house_id: house.id,
            is_admin: create.is_admin,
        }
        return await roleRepository.save(role);
    },
    updateRole: async (update: RoleUpdate) => {
        const role: any = await service.getRoleById(update.id);

        if (update.name) {
            role.name = update.name;
        }
        if (update.is_owner != null) {
            role.is_owner = update.is_owner;
        }
        if (update.house) {
            const house = await houseService.getHouseById(update.house.id);
            role.house_id = house.id;
        }
        return await roleRepository.save(role);
    },
    deleteRole: async (id: number) => {
        const role: any = await service.getRoleById(id);
        role.state = ObjectState.DELETED;
        role.deleted_at = new Date();
        return !!(await roleRepository.save(role));
    }
}

export default service;