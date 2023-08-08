import RoleHomeRepository from "../repositories/RoleHomeRepository"
import homeService from "./HomeService"
import roleService from "./RoleService"
import { RoleHomeCreate, RoleHomeUpdate } from "../dto/role_home";
import { ObjectState } from "@prisma/client";
const service = {
    search: async (params: any) => {
        return RoleHomeRepository.findAll();
    },
    getById: async (id: number) => {
        const roleHome = await RoleHomeRepository.findById(id);
        if (!roleHome) throw new Error("Không tìm thấy roleHome");
        return roleHome;
    },
    create: async (create: RoleHomeCreate) => {
        const home = await homeService.getHomeById(create.home.id);
        const role = await roleService.getRoleById(create.role.id);
        const roleHome: any = {
            id: 0,
            role_id: role.id,
            home_id: home.id,
        }
        return await RoleHomeRepository.save(roleHome);
    },
    update: async (update: RoleHomeUpdate) => {
        const roleHome: any = await service.getById(update.id);

        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            roleHome.home_id = home.id;
        }
        if (update.role) {
            const role = await roleService.getRoleById(update.role.id);
            roleHome.role_id = role.id;
        }
        return await RoleHomeRepository.save(roleHome);
    },
    delete: async (id: number) => {
        const roleHome: any = await service.getById(id);
        roleHome.state = ObjectState.DELETED;
        roleHome.deleted_at = new Date();
        return !!(await RoleHomeRepository.save(roleHome));
    }
}

export default service;