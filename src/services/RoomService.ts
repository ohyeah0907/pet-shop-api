import RoomRepository from "../repositories/RoomRepository"
import homeService from "./HomeService"
import userService from "./UserService"
import { RoomCreate, RoomSearch, RoomUpdate } from "../dto/room";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (search: RoomSearch) => {
        return RoomRepository.findAll(search);
    },
    getById: async (id: number) => {
        const room = await RoomRepository.findById(id);
        if (!room) throw new Error("Không tìm thấy room");
        return room;
    },
    create: async (create: RoomCreate) => {
        const home = await homeService.getHomeById(create.home.id);
        const room: any = {
            id: 0,
            name: create.name,
            home_id: home.id,
            thumb_image: create.thumb_image,
            panorama_image: create.panorama_image,
            is_home: false,
            ordering: 0,
        }
        return await RoomRepository.save(room);
    },
    update: async (update: RoomUpdate) => {
        const room: any = await service.getById(update.id);

        if (update.name) room.name = update.name;

        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            room.home_id = home.id;
        }

        if (update.thumb_image) room.thumb_image = update.thumb_image;

        if (update.panorama_image) room.panorama_image = update.panorama_image;

        if (update.is_home !== null) room.is_home = update.is_home;

        if (update.ordering) room.ordering = update.ordering;

        return await RoomRepository.save(room);
    },
    delete: async (id: number) => {
        const room: any = await service.getById(id);
        room.state = ObjectState.DELETED;
        room.deleted_at = new Date();
        return !!(await RoomRepository.save(room));
    }
}

export default service;