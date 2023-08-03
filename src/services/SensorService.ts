import SensorRepository from "../repositories/SensorRepository"
import houseService from "./HouseService"
import userService from "./UserService"
import { SensorCreate, SensorUpdate } from "../dto/sensor";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return SensorRepository.findAll();
    },
    getById: async (id: number) => {
        const sensor = await SensorRepository.findById(id);
        if (!sensor) throw new Error("Không tìm thấy sensor");
        return sensor;
    },
    create: async (create: SensorCreate) => {
        const house = await houseService.getHouseById(create.house.id);
        let parent: any = null;
        const sensor: any = {
            id: 0,
            name: create.name,
            house_id: house.id,
            entity_id: create.entity_id,
        }
        return await SensorRepository.save(sensor);
    },
    update: async (update: SensorUpdate) => {
        const sensor: any = await service.getById(update.id);

        if (update.name) {
            sensor.name = update.name;
        }
        if (update.house) {
            const house = await houseService.getHouseById(update.house.id);
            sensor.house_id = house.id;
        }
        if (update.entity_id) {
            sensor.entity_id = update.entity_id;
        }
        return await SensorRepository.save(sensor);
    },
    delete: async (id: number) => {
        const sensor: any = await service.getById(id);
        sensor.state = ObjectState.DELETED;
        sensor.deleted_at = new Date();
        return !!(await SensorRepository.save(sensor));
    }
}

export default service;