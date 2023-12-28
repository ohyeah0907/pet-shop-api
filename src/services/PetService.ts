import { ObjectState } from "@prisma/client";
import PetRepository from "../repositories/PetRepository";
import PetTypeService from "./PetTypeService";
import { PetCreate, PetSearch, PetUpdate } from "../dto/pet";
import recombeeClient from "../recombee";

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
    if (update.type?.id) {
      const type = await PetTypeService.getById(update.type.id);
      pet.type_id = type.id;
    }
    if (update.name) {
      pet.name = update.name;
    }
    if (update.sku) {
      pet.sku = update.sku;
    }
    if (update.stock_quantity) {
      pet.stock_quantity = update.stock_quantity;
    }
    if (update.price) {
      pet.price = update.price;
    }
    if (update.thumbnail_image) {
      pet.thumbnail_image = update.thumbnail_image;
    }
    if (update.description_images) {
      pet.description_images = update.description_images;
    }
    if (update.age) {
      pet.age = update.age;
    }
    if (update.color) {
      pet.color = update.color;
    }
    if (update.weight) {
      pet.weight = update.weight;
    }
    if (update.height) {
      pet.height = update.height;
    }
    if (update.birthday) {
      pet.birthday = new Date(update.birthday);
    }
    if (update.origin) {
      pet.origin = update.origin;
    }
    if (update.description) {
      pet.description = update.description;
    }
    if (update.isMale) {
      pet.isMale = update.isMale;
    }

    return await PetRepository.save(pet);
  },
  delete: async (id: number) => {
    const pet: any = await service.getById(id);
    pet.state = ObjectState.DELETED;
    pet.deleted_at = new Date();
    return !!(await PetRepository.save(pet));
  },
  createPetPropertiesToRecombee: async (data: {
    [key: string]:
      | "int"
      | "double"
      | "string"
      | "boolean"
      | "timestamp"
      | "set"
      | "image"
      | "imageList";
  }) => {
    return await Promise.all(
      Object.keys(data).map(async (item) => {
        const field = item;
        const requestRecombee = new recombeeClient.rqs.AddItemProperty(
          field,
          data[field],
        );
        requestRecombee.timeout = 10000;
        return await recombeeClient.client.send(requestRecombee);
      }),
    )
      .then((res) => ({
        success: true,
        message: "Thêm property pet thành công",
      }))
      .catch((err) => ({
        success: false,
        message: "Thêm property pet thất bại",
      }));
  },

  createPetToRecombee: async (pet: any) => {
    const result = {
      success: false,
      message: "",
    };
    if (pet.id && pet.name) {
      const requestRecombee = new recombeeClient.rqs.SetItemValues(
        `${pet.id}`,
        { name: pet.name, type: "pet" },
        {
          cascadeCreate: true,
        },
      );
      requestRecombee.timeout = 10000;

      await recombeeClient.client
        .send(requestRecombee)
        .then((response) => {
          console.log("response :>> ", response);
          result.success = true;
          result.message = "Thêm pet thành công vào recombee";
        })
        .catch((error) => {
          console.log("error :>> ", error);
          result.message = "Thêm pet thất bại vào recombee";
        });
    } else {
      result.message = "Thiếu field khi thêm pet vào recombee";
    }
    return result;
  },
};

export default service;
