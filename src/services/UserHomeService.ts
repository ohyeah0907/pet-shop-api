import UserHomeRepository from "../repositories/UserHomeRepository"
import { UserHomeCreate, UserHomeSearch, UserHomeUpdate } from "../dto/user_home";
import userService from "./UserService";
import homeService from "./HomeService";

const service = {
    search: async (search: UserHomeSearch) => {
        return UserHomeRepository.findAll(search);
    },
    getById: async (id: number) => {
        const userHome = await UserHomeRepository.findById(id);
        if (!userHome) throw new Error("Không tìm thấy userHome");
        return userHome;
    },
    getByRoleHomeIdAndUserId: async (homeId: number, userId: number) => {
        const userHome = await UserHomeRepository.findByHomeIdAndUserId(homeId, userId);
        if (!userHome) throw new Error("Không tìm thấy userHome");
        return userHome;
    },
    create: async (create: UserHomeCreate) => {
        const user = await userService.getUserById(create.user.id);
        const userHome: any = {
            id: 0,
            home_id: create.home.id,
            user_id: user.id,
            ha_username: create.ha_username,
            ha_password: create.ha_password,
            lan_only: false,
            is_owner: false,
            ordering: 0,
        }
        return await UserHomeRepository.save(userHome);
    },
    update: async (update: UserHomeUpdate) => {
        const userHome: any = await service.getById(update.id);
        if (update.user) {
            const user = await userService.getUserById(update.user.id);
            userHome.user_id = user.id;
        }
        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            userHome.home_id = home.id;
        }
        if (update.ha_username) userHome.ha_username = update.ha_username;

        if (update.ha_password) userHome.ha_password = update.ha_password;

        if (update.lan_only != null) userHome.lan_only = update.lan_only;

        if (update.is_owner != null) userHome.is_owner = update.is_owner;

        if (update.ordering) userHome.ordering = update.ordering;


        return await UserHomeRepository.save(userHome);
    },
    delete: async (id: number) => {
        const userHome: any = await service.getById(id);
        return !!(await UserHomeRepository.deleteById(userHome.id));
    },
}

export default service;