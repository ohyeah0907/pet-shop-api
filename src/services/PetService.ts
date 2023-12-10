import { ObjectState } from "@prisma/client";
import PetRepository from "../repositories/PetRepository";
import PetTypeService from "./PetTypeService";
import { PetCreate, PetSearch, PetUpdate } from "../dto/pet";

const service = {
  getSearch: async (search: PetSearch) => {
    return PetRepository.findAll(search);
  },
  getById: async (id: number) => {
    const pet = await PetRepository.findById(id);
    if (!pet) throw new Error("Không tìm thấy pet");
    return pet;
  },
  create: async (create: PetCreate) => {
    const pet: any = {
      id: 0,
      name: create.name,
      sku: create.sku,
      stock_quantity: create.stock_quantity,
      price: create.price,
      thumbnail_image: create.thumbnail_image,
      description_images: create.description_images,
      age: create.age,
      isMale: create.isMale,
      color: create.color,
      weight: create.weight,
      height: create.height,
      birthday: new Date(create.birthday),
      origin: create.origin,
      description: create.description,
      type_id: create.type.id,
    };
    const created = await PetRepository.save(pet);
    return created;
  },
  update: async (update: PetUpdate) => {
    const pet: any = await service.getById(update.id);
    const type = await PetTypeService.getById(update.type.id);
    pet.type_id = type.id;

    pet.name = update.name;
    pet.sku = update.sku;
    pet.stock_quantity = update.stock_quantity;
    pet.price = update.price;
    pet.thumbnail_image = update.thumbnail_image;
    pet.description_images = update.description_images;
    pet.age = update.age;
    pet.color = update.color;
    pet.weight = update.weight;
    pet.height = update.height;
    pet.birthday = new Date(update.birthday);
    pet.origin = update.origin;
    pet.description = update.description;
    pet.isMale = update.isMale;

    return await PetRepository.save(pet);
  },
  delete: async (id: number) => {
    const pet: any = await service.getById(id);
    pet.state = ObjectState.DELETED;
    pet.deleted_at = new Date();
    return !!(await PetRepository.save(pet));
  },
};

export default service;
