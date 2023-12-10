import { ObjectState } from "@prisma/client";
import {
  ProductPromotionSearch,
  ProductPromotionCreate,
  ProductPromotionUpdate,
} from "../dto/product_promotion";
import ProductPromotionRepository from "../repositories/ProductPromotionRepository";
import PromotionService from "./PromotionService";
import PetService from "./PetService";
import AccessoryService from "./AccessoryService";

const service = {
  getSearch: async (search?: ProductPromotionSearch, include?: object) => {
    return ProductPromotionRepository.findAll(search, include);
  },
  getById: async (id: number) => {
    const productPromotion = await ProductPromotionRepository.findById(id);
    if (!productPromotion) throw new Error("Không tìm thấy product promotion");
    return productPromotion;
  },
  create: async (create: ProductPromotionCreate) => {
    const promotion = await PromotionService.getById(create.promotion?.id);
    if (create.pet?.id) {
      const pet = await PetService.getById(create.pet?.id);
    }
    if (create.accessory?.id) {
      const accessory = await AccessoryService.getById(create.accessory?.id);
    }

    const order: any = {
      id: 0,
      pet_id: create.pet?.id,
      accessory_id: create.accessory?.id,
      promotion_id: promotion.id,
    };
    const created = await ProductPromotionRepository.save(order);

    return created;
  },
  update: async (update: ProductPromotionUpdate) => {
    const productFeedback = await service.getById(update.id);
    const promotion = await PromotionService.getById(update.promotion!.id);
    productFeedback.promotion_id = promotion.id;

    if (update.pet?.id) {
      const pet = await PetService.getById(update.pet?.id);
      productFeedback.pet_id = update.pet.id;
      productFeedback.accessory_id = null;
    }
    if (update.accessory?.id) {
      const accessory = await AccessoryService.getById(update.accessory?.id);
      productFeedback.accessory_id = update.accessory.id;
      productFeedback.pet_id = null;
    }

    return await ProductPromotionRepository.save(productFeedback);
  },
  delete: async (id: number) => {
    const productPromotion: any = await service.getById(id);
    productPromotion.state = ObjectState.DELETED;
    productPromotion.deleted_at = new Date();
    return !!(await ProductPromotionRepository.save(productPromotion));
  },
};

export default service;
