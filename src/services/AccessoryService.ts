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
    if (update.type?.id) {
      const type = await AccessoryTypeService.getById(update.type.id);
      accessory.type_id = type.id;
    }
    if (update.name) {
      accessory.name = update.name;
    }
    if (update.sku) {
      accessory.sku = update.sku;
    }
    if (update.stock_quantity) {
      accessory.stock_quantity = update.stock_quantity;
    }
    if (update.price) {
      accessory.price = update.price;
    }
    if (update.thumbnail_image) {
      accessory.thumbnail_image = update.thumbnail_image;
    }
    if (update.description_images) {
      accessory.description_images = update.description_images;
    }
    if (update.weight) {
      accessory.weight = update.weight;
    }
    if (update.origin) {
      accessory.origin = update.origin;
    }
    if (update.description) {
      accessory.description = update.description;
    }
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
