import UserHomeRepository from "../repositories/UserHomeRepository"
import { UserHomeCreate, UserHomeSearch, UserHomeUpdate } from "../dto/user_home";
import roleHomeService from "./RoleHomeService";
import userService from "./UserService";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (search: UserHomeSearch) => {
        return UserHomeRepository.findAll(search);
    },
    getById: async (id: number) => {
        const userHome = await UserHomeRepository.findById(id);
        if (!userHome) throw new Error("Không tìm thấy userHome");
        return userHome;
    },
    create: async (create: UserHomeCreate) => {
        const roleHome = await roleHomeService.getById(create.role_home.id);
        const user = await userService.getUserById(create.user.id);
        const userHome: any = {
            id: 0,
            role_home_id: roleHome.id,
            user_id: user.id,
            ha_username: create.ha_username,
            ha_password: create.ha_password,
            ordering: create.ordering,
        }
        return await UserHomeRepository.save(userHome);
    },
    update: async (update: UserHomeUpdate) => {
        const userHome: any = await service.getById(update.id);
        if (update.role_home) {
            const roleHome = await roleHomeService.getById(update.role_home.id);
            userHome.role_home_id = roleHome.id;
        }
        if(update.user) {
            const user = await userService.getUserById(update.user.id);
            userHome.user_id = user.id;
        }
        if (update.ha_username) {
            userHome.ha_username = update.ha_username;
        }
        if (update.ha_password) {
            userHome.ha_password = update.ha_password;
        }
        if (update.ordering) {
            userHome.ordering = update.ordering;
        }
        
        return await UserHomeRepository.save(userHome);
    },
    delete: async (id: number) => {
        const userHome: any = await service.getById(id);
        userHome.state = ObjectState.DELETED;
        userHome.deleted_at = new Date();
        return !!(await UserHomeRepository.save(userHome));
    }
}

export default service;