import RoleHomeRepository from "../repositories/RoleHomeRepository"
import homeService from "./HomeService"
import roleService from "./RoleService"
import { RoleHomeCreate, RoleHomeCreateAndUpdate, RoleHomeSearch, RoleHomeUpdate } from "../dto/role_home";
import { ObjectState } from "@prisma/client";
const service = {
    search: async (search: RoleHomeSearch) => {
        return RoleHomeRepository.findAll(search);
    },
    getById: async (id: number) => {
        const roleHome = await RoleHomeRepository.findById(id);
        if (!roleHome) throw new Error("Không tìm thấy roleHome");
        return roleHome;
    },
    getByRoleIdAndHomeId: async (homeId: number, roleId: number) => {
        const roleHome = await RoleHomeRepository.findByRoleIdAndHomeId(homeId, roleId);
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
    createAndUpdate: async (create: RoleHomeCreateAndUpdate) => {
        const home = await homeService.getHomeById(create.home.id);
        let roleHomes: any = [];
        let roleHomesCreate: any = [];
        await RoleHomeRepository.deleteAll(home.id);
        for (let role of create.roles) {
            const roleHome: any = await RoleHomeRepository.findByRoleIdAndHomeId(home.id, role.id);
            if (!roleHome) {
                roleHomesCreate.push({
                    id: 0,
                    role_id: role.id,
                    home_id: home.id,
                })
            } else {
                roleHome.state = ObjectState.ACTIVE;
                roleHome.deleted_at = null;
                roleHomes.push(roleHome);
            }
        }
        await RoleHomeRepository.createMany(roleHomesCreate)
        await RoleHomeRepository.updateMany(roleHomes)
        return true;
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