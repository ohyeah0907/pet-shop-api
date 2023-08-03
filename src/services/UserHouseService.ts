import UserHouseRepository from "../repositories/UserHouseRepository"
import { UserHouseCreate, UserHouseUpdate } from "../dto/user_house";
import roleHouseService from "./RoleHouseService";
import userService from "./UserService";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return UserHouseRepository.findAll();
    },
    getById: async (id: number) => {
        const userHouse = await UserHouseRepository.findById(id);
        if (!userHouse) throw new Error("Không tìm thấy userHouse");
        return userHouse;
    },
    create: async (create: UserHouseCreate) => {
        const roleHouse = await roleHouseService.getById(create.role_house.id);
        const user = await userService.getUserById(create.user.id);
        const userHouse: any = {
            id: 0,
            role_house_id: roleHouse.id,
            user_id: user.id,
            ha_username: create.ha_username,
            ha_password: create.ha_password,
            ordering: create.ordering,
        }
        return await UserHouseRepository.save(userHouse);
    },
    update: async (update: UserHouseUpdate) => {
        const userHouse: any = await service.getById(update.id);
        if (update.role_house) {
            const roleHouse = await roleHouseService.getById(update.role_house.id);
            userHouse.role_house_id = roleHouse.id;
        }
        if(update.user) {
            const user = await userService.getUserById(update.user.id);
            userHouse.user_id = user.id;
        }
        if (update.ha_username) {
            userHouse.ha_username = update.ha_username;
        }
        if (update.ha_password) {
            userHouse.ha_password = update.ha_password;
        }
        if (update.ordering) {
            userHouse.ordering = update.ordering;
        }
        
        return await UserHouseRepository.save(userHouse);
    },
    delete: async (id: number) => {
        const userHouse: any = await service.getById(id);
        userHouse.state = ObjectState.DELETED;
        userHouse.deleted_at = new Date();
        return !!(await UserHouseRepository.save(userHouse));
    }
}

export default service;