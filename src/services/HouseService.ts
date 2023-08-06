import { ObjectState } from "@prisma/client";
import { BadRequestResponse, NotFoundResponse } from "../handler/app-response";
import prisma from "../prisma";
import HouseRepository from "../repositories/HouseRepository"
import houseCloudService from "./HouseCloudService";
import { HouseCreate, HouseUpdate } from "../dto/house";

const service = {
    getHouseSearch: async (params: any) => {
        return HouseRepository.findAll();
    },
    getHouseById: async (id: number) => {
        const house = await HouseRepository.findById(id);
        if (!house) throw new Error("Không tìm thấy house");
        return house;
    },
    getHouseInfo: async (id: number) => {
        const house = await HouseRepository.findByIdQueryHouseInfo(id);
        if (!house) throw new Error("Không tìm thấy house");
        return house;
    },
    createHouse: async (create: HouseCreate) => {
        const house: any = {
            id: 0,
            address: create.address,
            name: create.name,
            lan_ip: create.lan_ip,
            lan_port: create.lan_port,
            wan_port: create.wan_port,
            wan_domain: create.wan_domain,
            username: create.username,
            password: create.password,
            image_url: create.image_url,
            state: ObjectState.ACTIVE,
        }
        const created = await HouseRepository.save(house);
        return created;
    },
    updateHouse: async (update: HouseUpdate) => {
        const house: any = await service.getHouseById(update.id);

        if(update.address) {
            house.address = update.address;
        }
        if(update.name) {
            house.name = update.name;
        }
        if(update.lan_ip) {
            house.lan_ip = update.lan_ip;
        }
        if(update.wan_ip) {
            house.wan_ip = update.wan_ip;
        }
        if(update.username) {
            house.username = update.username;
        }
        if(update.password) {
            house.password = update.password;
        }
        if(update.image_url) {
            house.image_url = update.image_url;
        }
        if(update.remote_port) {
            house.remote_port = update.remote_port;
        }
        if(update.remote_ip) {
            house.remote_ip = update.remote_ip;
        }
        if(update.wan_port) {
            house.wan_port = update.wan_port;
        }
        if(update.lan_port) {
            house.lan_port = update.lan_port;
        }
        if(update.active_house_cloud) {
            const active_house_cloud = await houseCloudService.getHouseCloudById(update.active_house_cloud.id);
            if(active_house_cloud.house_id != house.id) throw new Error("Cloud này không có trong danh sách nhà của bạn");
            house.active_house_cloud_id = active_house_cloud.id;
        } else {
            house.active_house_cloud_id = null;
        }
        return await HouseRepository.save(house);
    },
    deleteHouse: async (id: number) => {
        const house: any = await service.getHouseById(id);
        house.state = ObjectState.DELETED;
        house.deleted_at = new Date();
        return !!(await HouseRepository.save(house));
    }

}

export default service;