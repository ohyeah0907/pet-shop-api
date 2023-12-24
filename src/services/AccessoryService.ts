import { ObjectState } from "@prisma/client";
import AccessoryRepository from "../repositories/AccessoryRepository";
import {
  AccessoryCreate,
  AccessorySearch,
  AccessoryUpdate,
} from "../dto/accessory";
import AccessoryTypeService from "../services/AccessoryTypeService";

const service = {
  getSearch: async (search: AccessorySearch, include?: object) => {
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
      sku: create.sku,
      name: create.name,
      stock_quantity: create.stock_quantity,
      price: create.price,
      thumbnail_image: create.thumbnail_image,
      description_images: create.description_images,
      weight: create.weight,
      origin: create.origin,
      description: create.description,
      type_id: type.id,
    };
    const created = await AccessoryRepository.save(accessory);
    return created;
  },
  update: async (update: AccessoryUpdate) => {
    const accessory: any = await service.getById(update.id);
    const type = await AccessoryTypeService.getById(update.type.id);
    accessory.type_id = type.id;

    accessory.name = update.name;
    accessory.sku = update.sku;
    accessory.stock_quantity = update.stock_quantity;
    accessory.price = update.price;
    accessory.thumbnail_image = update.thumbnail_image;
    accessory.description_images = update.description_images;
    accessory.weight = update.weight;
    accessory.origin = update.origin;
    accessory.description = update.description;

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
