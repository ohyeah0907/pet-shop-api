import { TagCreate, TagUpdate } from "../dto/tag";
import { ObjectState } from "@prisma/client";
import TagRepository from "../repositories/TagRepository";


const service = {
    search: async (params: any) => {
        return TagRepository.findAll();
    },
    getById: async (id: number) => {
        const tag = await TagRepository.findById(id);
        if (!tag) throw new Error("Không tìm thấy tag");
        return tag;
    },
    create: async (create: TagCreate) => {
        const tag: any = {
            id: 0,
            name: create.name,
        }
        return await TagRepository.save(tag);
    },
    update: async (update: TagUpdate) => {
        const tag: any = await service.getById(update.id);
        if(update.name) {
            tag.name = update.name;
        }
        return await TagRepository.save(tag);
    },
    delete: async (id: number) => {
        const tag: any = await service.getById(id);
        tag.state = ObjectState.DELETED;
        return await TagRepository.save(tag);
    }

}

export default service;