import { House } from "@prisma/client";
import { BadRequestResponse, NotFoundResponse } from "../handler/app-response";
import prisma from "../prisma";
import HouseCloudRepository from "../repositories/HouseCloudRepository"
import houseService from "./HouseService";
import cloudService from "./CloudService";
import { HouseCreate, HouseUpdate } from "../dto/house";
import { ObjectState } from "@prisma/client";
import { HouseCloudCreate, HouseCloudUpdate } from "../dto/house_cloud";

const service = {
    getHouseCloudSearch: async (params: any) => {
        return HouseCloudRepository.findAll();
    },
    getHouseCloudById: async (id: number) => {
        const house = await HouseCloudRepository.findById(id);
        if (!house) throw new Error("Không tìm thấy house cloud");
        return house;
    },
    createHouseCloud: async (create: HouseCloudCreate) => {
        const house = await houseService.getHouseById(create.house.id);
        const cloud = await cloudService.getCloudById(create.cloud.id);
        const houseCloud: any = {
            id: 0,
            cloud_id: cloud.id,
            house_id: house.id,
            vpn_ip: create.vpn_ip,
            private_key: create.private_key,
            public_key: create.public_key,
            pre_shared_key: create.pre_shared_key,
            cloud_port: create.cloud_port,
            state: ObjectState.ACTIVE,
        }
        const created = await HouseCloudRepository.save(houseCloud);
        return created;
    },
    updateHouseCloud: async (update: HouseCloudUpdate) => {
        const house: any = await service.getHouseCloudById(update.id);
        if(update.cloud) {
            house.cloud_id = update.cloud.id;
        }
        if(update.house) {
            house.house_id = update.house.id;
        }
        if(update.vpn_ip) {
            house.vpn_ip = update.vpn_ip;
        }
        if(update.private_key) {
            house.private_key = update.private_key;
        }
        if(update.public_key) {
            house.public_key = update.public_key;
        }
        if(update.pre_shared_key) {
            house.pre_shared_key = update.pre_shared_key;
        }
        if(update.cloud_port) {
            house.cloud_port = update.cloud_port;
        }
        return await HouseCloudRepository.save(house);
    },
    deleteHouseCloud: async (id: number) => {
        const house: any = await service.getHouseCloudById(id);
        house.state = ObjectState.DELETED;
        house.deleted_at = new Date();
        return !!(await HouseCloudRepository.save(house));
    }

}

export default service;