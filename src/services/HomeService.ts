import { ObjectState } from "@prisma/client";
import { BadRequestResponse, NotFoundResponse } from "../handler/app-response";
import prisma from "../prisma";
import HomeRepository from "../repositories/HomeRepository"
import roleHomeService from "./RoleHomeService";
import roleService from "./RoleService";
import userService from "./UserService";
import userHomeService from "./UserHomeService";
import homeCloudService from "./HomeCloudService";
import { HomeCreate, HomeRoleUserCreate, HomeRoleUserUpdate, HomeUpdate } from "../dto/home";
import { RoleHomeCreate, RoleHomeUpdate } from "../dto/role_home";
import { UserHomeCreate, UserHomeUpdate } from "../dto/user_home";

const service = {
    getHomeSearch: async (params: any) => {
        return HomeRepository.findAll();
    },
    getHomeById: async (id: number) => {
        const home = await HomeRepository.findById(id);
        if (!home) throw new Error("Không tìm thấy home");
        return home;
    },
    getHomeInfo: async (id: number) => {
        const home = await HomeRepository.findByIdQueryHomeInfo(id);
        if (!home) throw new Error("Không tìm thấy home");
        return home;
    },
    createHome: async (create: HomeCreate) => {
        const home: any = {
            id: 0,
            address: create.address,
            name: create.name,
            lan_ip: create.lan_ip,
            lan_port: create.lan_port,
            wan_port: create.wan_port,
            wan_domain: create.wan_domain,
            image_url: create.image_url,
            state: ObjectState.ACTIVE,
        }
        const created = await HomeRepository.save(home);
        return created;
    },
    updateHome: async (update: HomeUpdate) => {
        const home: any = await service.getHomeById(update.id);

        if (update.address) {
            home.address = update.address;
        }
        if (update.name) {
            home.name = update.name;
        }
        if (update.lan_ip) {
            home.lan_ip = update.lan_ip;
        }
        if (update.wan_domain) {
            home.wan_domain = update.wan_domain;
        }
        if (update.image_url) {
            home.image_url = update.image_url;
        }
        if (update.wan_port) {
            home.wan_port = update.wan_port;
        }
        if (update.lan_port) {
            home.lan_port = update.lan_port;
        }
        if (update.active_home_cloud) {
            const active_home_cloud = await homeCloudService.getHomeCloudById(update.active_home_cloud.id);
            if (active_home_cloud.home_id != home.id) throw new Error("Cloud này không có trong danh sách nhà của bạn");
            home.active_home_cloud_id = active_home_cloud.id;
        } else {
            home.active_home_cloud_id = null;
        }
        return await HomeRepository.save(home);
    },
    deleteHome: async (id: number) => {
        const home: any = await service.getHomeById(id);
        home.state = ObjectState.DELETED;
        home.deleted_at = new Date();
        return !!(await HomeRepository.save(home));
    },

    createFullOptionHomeRoleUser: async (create: HomeRoleUserCreate) => {
        return prisma.$transaction(async () => {
            const roleHomeCreate: RoleHomeCreate = {
                home: create.home,
                role: create.role,
            }
            let roleHome = null;
            try {
                roleHome = await roleHomeService.getByRoleIdAndHomeId(roleHomeCreate.home.id, roleHomeCreate.role.id);
            } catch (e) {
                roleHome = await roleHomeService.create(roleHomeCreate);
            }
            const userHomeCreate: UserHomeCreate = {
                user: create.user,
                role_home: roleHome,
                ha_password: create.ha_password,
                ha_username: create.ha_username,
                ordering: 0,
            }
            const userHome = await userHomeService.create(userHomeCreate);

            return userHome;
        })
    },

    updateFullOptionHomeRoleUser: async (update: HomeRoleUserUpdate) => {
        return prisma.$transaction(async () => {
            const userHome = await userHomeService.getById(update.user_home.id);
            let roleHome = await roleHomeService.getById(userHome.role_home.id);
            let userHomeUpdate: UserHomeUpdate = {
                ha_password: userHome.ha_password,
                ha_username: userHome.ha_username,
                id: userHome.id,
                ordering: userHome.ordering,
                user: userHome.user,
                role_home: roleHome,
            }
            if (update.role) {
                const role = await roleService.getRoleById(update.role.id);
                let newRoleHome = null;
                try {
                    newRoleHome = await roleHomeService.getByRoleIdAndHomeId(update.home.id, role.id);
                } catch (e: any) {
                    newRoleHome = await roleHomeService.create({
                        home: update.home,
                        role: role,
                    })
                }
                userHomeUpdate.role_home = newRoleHome;
            }
            if (update.user) {
                const user = await userService.getUserById(update.user.id);
                userHomeUpdate.user = user;
            }
            if (update.ha_password) {
                userHome.ha_password = update.ha_password;
            }
            if (update.ha_username) {
                userHome.ha_username = update.ha_username;
            }

            await userHomeService.update(userHomeUpdate);
            return true;
        })
    }

}

export default service;