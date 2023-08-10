import { ObjectState } from "@prisma/client";
import { BadRequestResponse, NotFoundResponse } from "../handler/app-response";
import prisma from "../prisma";
import HomeRepository from "../repositories/HomeRepository"
import roleHomeService from "./RoleHomeService";
import roleService from "./RoleService";
import userService from "./UserService";
import userHomeService from "./UserHomeService";
import homeCloudService from "./HomeCloudService";
import { HomeCreate, HomeRoleUserCreate, HomeUpdate } from "../dto/home";
import { RoleHomeCreate } from "../dto/role_home";
import { UserHomeCreate } from "../dto/user_home";

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

}

export default service;