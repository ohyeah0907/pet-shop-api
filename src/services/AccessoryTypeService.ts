import { ObjectState } from "@prisma/client";
import AccessoryTypeRepository from "../repositories/AccessoryTypeRepository";
import {
  AccessoryTypeCreate,
  AccessoryTypeSearch,
  AccessoryTypeUpdate,
} from "../dto/accessory_type";

const service = {
  getSearch: async (search?: AccessoryTypeSearch, include?: object) => {
    return AccessoryTypeRepository.findAll(search, include);
  },
  getById: async (id: number) => {
    const accessory = await AccessoryTypeRepository.findById(id);
    if (!accessory) throw new Error("Không tìm thấy accessory");
    return accessory;
  },
  create: async (create: AccessoryTypeCreate) => {
    let parent: any = null;
    if (create.parent?.id) {
      parent = await service.getById(Number(create.parent!.id));
    }
    const accessory: any = {
      id: 0,
      name: create.name,
      parent_id: parent ? parent.id : null,
    };

    const created = await AccessoryTypeRepository.save(accessory);
    return created;
  },
  update: async (update: AccessoryTypeUpdate) => {
    const accessory: any = await service.getById(update.id);
    if (update.parent?.id) {
      const parent = await service.getById(update.parent!.id);
      accessory.parent_id = parent.id;
    }

    accessory.name = update.name;

    return await AccessoryTypeRepository.save(accessory);
  },
  delete: async (id: number) => {
    const accessory: any = await service.getById(id);

    accessory.state = ObjectState.DELETED;
    accessory.deleted_at = new Date();

    return !!(await AccessoryTypeRepository.save(accessory));
  },
};

export default service;
