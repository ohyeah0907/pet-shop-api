import { ObjectState } from "@prisma/client";
import AccessoryRepository from "../repositories/AccessoryRepository";
import { AccessoryCreate, AccessoryUpdate } from "../dto/accessory";
import AccessoryTypeService from "../services/AccessoryTypeService";

const service = {
  getSearch: async (search?: object, include?: object) => {
    return AccessoryRepository.findAll(search, include);
  },
  getById: async (id: number) => {
    const accessory = await AccessoryRepository.findById(id);
    if (!accessory) throw new Error("Không tìm thấy accessory");
    return accessory;
  },
  create: async (create: AccessoryCreate) => {
    let type = await AccessoryTypeService.getById(create.type.id);

    const accessory: any = {
      id: 0,
      name: create.name,
      stock_quantity: create.stock_quantity,
      price: create.price,
      thumbnail_image: create.thumbnail_image,
      description_image: create.description_image,
      origin: create.origin,
      description: create.description,
      type_id: type.id,
    };
    const created = await AccessoryRepository.save(accessory);
    return created;
  },
  update: async (update: AccessoryUpdate) => {
    const accessory: any = await service.getById(update.id);

    if (update.name) {
      accessory.name = update.name;
    }

    accessory.updated_at = new Date();

    return await AccessoryRepository.save(accessory);
  },
  delete: async (id: number) => {
    const accessory: any = await service.getById(id);
    accessory.state = ObjectState.DELETED;
    accessory.deleted_at = new Date();
    return !!(await AccessoryRepository.save(accessory));
  },
};

export default service;
