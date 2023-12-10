import { ObjectState } from "@prisma/client";
import {
  ProductFeedbackSearch,
  ProductFeedbackCreate,
  ProductFeedbackUpdate,
} from "../dto/product_feedback";
import ProductFeedbackRepository from "../repositories/ProductFeedbackRepository";
import UserService from "./UserService";
import PetService from "./PetService";
import AccessoryService from "./AccessoryService";

const service = {
  getSearch: async (search?: ProductFeedbackSearch, include?: object) => {
    return ProductFeedbackRepository.findAll(search, include);
  },
  getById: async (id: number) => {
    const productFeedback = await ProductFeedbackRepository.findById(id);
    if (!productFeedback) throw new Error("Không tìm thấy product feedback");
    return productFeedback;
  },
  create: async (create: ProductFeedbackCreate) => {
    const user = await UserService.getUserById(Number(create.user?.id));
    if (create.pet?.id) {
      const pet = await PetService.getById(Number(create.pet?.id));
    }
    if (create.accessory?.id) {
      const accessory = await AccessoryService.getById(
        Number(create.accessory?.id),
      );
    }

    const order: any = {
      id: 0,
      user_id: user.id,
      pet_id: create.pet?.id,
      accessory_id: create.accessory?.id,
      rating: create.rating,
      content: create.content,
    };
    const created = await ProductFeedbackRepository.save(order);

    return created;
  },
  update: async (update: ProductFeedbackUpdate) => {
    const productFeedback = await service.getById(update.id);
    const user = await UserService.getUserById(update.user!.id);
    productFeedback.user_id = user.id;

    if (update.pet?.id) {
      const pet = await PetService.getById(update.pet!.id);
      productFeedback.pet_id = pet.id;
      productFeedback.accessory_id = null;
    }
    if (update.accessory?.id) {
      const accessory = await AccessoryService.getById(update.accessory!.id);
      productFeedback.accessory_id = accessory.id;
      productFeedback.pet_id = null;
    }

    productFeedback.content = update.content;
    productFeedback.rating = update.rating;

    return await ProductFeedbackRepository.save(productFeedback);
  },
  delete: async (id: number) => {
    const productFeedback: any = await service.getById(id);
    productFeedback.state = ObjectState.DELETED;
    productFeedback.deleted_at = new Date();
    return !!(await ProductFeedbackRepository.save(productFeedback));
  },
};

export default service;
