import { Home } from "@prisma/client";
import { BadRequestResponse, NotFoundResponse } from "../handler/app-response";
import prisma from "../prisma";
import HomeCloudRepository from "../repositories/HomeCloudRepository"
import homeService from "./HomeService";
import cloudService from "./CloudService";
import { HomeCreate, HomeUpdate } from "../dto/home";
import { ObjectState } from "@prisma/client";
import { HomeCloudCreate, HomeCloudUpdate } from "../dto/home_cloud";

const service = {
    getHomeCloudSearch: async (params: any) => {
        return HomeCloudRepository.findAll();
    },
    getHomeCloudById: async (id: number) => {
        const home = await HomeCloudRepository.findById(id);
        if (!home) throw new Error("Không tìm thấy home cloud");
        return home;
    },
    createHomeCloud: async (create: HomeCloudCreate) => {
        const home = await homeService.getHomeById(create.home.id);
        const cloud = await cloudService.getCloudById(create.cloud.id);
        const homeCloud: any = {
            id: 0,
            cloud_id: cloud.id,
            home_id: home.id,
            vpn_ip: create.vpn_ip,
            private_key: create.private_key,
            public_key: create.public_key,
            pre_shared_key: create.pre_shared_key,
            cloud_port: create.cloud_port,
            state: ObjectState.ACTIVE,
        }
        const created = await HomeCloudRepository.save(homeCloud);
        return created;
    },
    updateHomeCloud: async (update: HomeCloudUpdate) => {
        const home: any = await service.getHomeCloudById(update.id);
        if(update.cloud) {
            home.cloud_id = update.cloud.id;
        }
        if(update.home) {
            home.home_id = update.home.id;
        }
        if(update.vpn_ip) {
            home.vpn_ip = update.vpn_ip;
        }
        if(update.private_key) {
            home.private_key = update.private_key;
        }
        if(update.public_key) {
            home.public_key = update.public_key;
        }
        if(update.pre_shared_key) {
            home.pre_shared_key = update.pre_shared_key;
        }
        if(update.cloud_port) {
            home.cloud_port = update.cloud_port;
        }
        return await HomeCloudRepository.save(home);
    },
    deleteHomeCloud: async (id: number) => {
        const home: any = await service.getHomeCloudById(id);
        home.state = ObjectState.DELETED;
        home.deleted_at = new Date();
        return !!(await HomeCloudRepository.save(home));
    }

}

export default service;