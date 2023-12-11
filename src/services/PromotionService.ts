import { ObjectState } from "@prisma/client";
import {
  PromotionSearch,
  PromotionCreate,
  PromotionUpdate,
} from "../dto/promotion";
import PromotionRepository from "../repositories/PromotionRepository";

const service = {
  getSearch: async (search?: PromotionSearch, include?: object) => {
    return PromotionRepository.findAll(search, include);
  },
  getById: async (id: number) => {
    const promotion = await PromotionRepository.findById(id);
    if (!promotion) throw new Error("Không tìm thấy promotion");
    return promotion;
  },
  create: async (create: PromotionCreate) => {
    const promotion: any = {
      id: 0,
      name: create.name,
      description: create.description,
      start_date: new Date(create.start_date),
      end_date: new Date(create.end_date),
    };
    const created = await PromotionRepository.save(promotion);

    return created;
  },
  update: async (update: PromotionUpdate) => {
    const promotion = await service.getById(update.id);

    promotion.name = update.name;
    promotion.description = update.description;
    promotion.start_date = new Date(update.start_date);
    promotion.end_date = new Date(update.end_date);

    return await PromotionRepository.save(promotion);
  },
  delete: async (id: number) => {
    const promotion: any = await service.getById(id);
    promotion.state = ObjectState.DELETED;
    promotion.deleted_at = new Date();
    return !!(await PromotionRepository.save(promotion));
  },
};

export default service;
