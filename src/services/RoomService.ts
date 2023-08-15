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
        const user = await userService.getUserById(create.user.id);
        // let parent: any = null;
        // if (create.parent) {
        //     parent = await service.getById(create.parent.id);
        // }
        const room: any = {
            id: 0,
            name: create.name,
            home_id: home.id,
            user_id: user.id,
            // parent_id: parent?.id,
            image_url: create.image_url,
            is_home: false,
            ordering: 0,
        }
        return await RoomRepository.save(room);
    },
    update: async (update: RoomUpdate) => {
        const room: any = await service.getById(update.id);

        if (update.name) {
            room.name = update.name;
        }
        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            room.home_id = home.id;
        }
        // if (update.parent !== undefined) {
        //     const parent = update.parent ? await service.getById(update.parent.id) : null;
        //     room.parent_id = parent ? parent.id : null;
        //     room.is_home = !parent;
        // }
        if (update.user) {
            const user = await userService.getUserById(update.user.id);
            room.user_id = user.id;
        }
        if (update.image_url) {
            room.image_url = update.image_url;
        }
        if(update.is_home !== null) {
            room.is_home = update.is_home;
        }
        if (update.ordering) {
            room.ordering = update.ordering;
        }
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