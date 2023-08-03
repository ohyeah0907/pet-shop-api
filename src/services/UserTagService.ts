import { UserTagCreate, UserTagUpdate } from "../dto/user_tag";
import { ObjectState } from "@prisma/client";
import userTagRepository from "../repositories/UserTagRepository";
import tagService from "./TagService";
import userService from "./UserService";


const service = {
    search: async (params: any) => {
        return userTagRepository.findAll();
    },
    getById: async (id: number) => {
        const userTag = await userTagRepository.findById(id);
        if (!userTag) throw new Error("Không tìm thấy userTag");
        return userTag;
    },
    create: async (create: UserTagCreate) => {
        const tag = await tagService.getById(create.tag.id);
        const user = await userService.getUserById(create.user.id);
        const userTag: any = {
            id: 0,
            tag_id: tag.id,
            user_id: user.id,
        }
        return await userTagRepository.save(userTag);
    },
    update: async (update: UserTagUpdate) => {
        const userTag: any = await service.getById(update.id);
        if (update.tag) {
            const tag = await tagService.getById(update.tag.id);
            userTag.tag_id = tag.id;
        }
        if(update.user) {
            const user = await userService.getUserById(update.user.id);
            userTag.user_id = user.id;
        }
        return await userTagRepository.save(userTag);
    },
    delete: async (id: number) => {
        const userTag: any = await service.getById(id);
        userTag.state = ObjectState.DELETED;
        return await userTagRepository.save(userTag);
    }

}

export default service;