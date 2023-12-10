import { PromotionSearch } from "../dto/promotion";
import prisma from "../prisma";
import { Promotion, ObjectState } from "@prisma/client";

const findAll = async (search?: PromotionSearch, include?: object) => {
  const condition: any = {};

  if (search?.name) {
    condition.name = {
      contains: search.name,
    };
  }
  if (search?.state) {
    condition.state = search.state;
  }
  if (search?.someStates) {
    condition.state = {
      in: search.someStates,
    };
  }
  if (search?.notInIds && Array.isArray(search.notInIds)) {
    condition.id = {
      notIn: search.notInIds,
    };
  }

  const promotions = await prisma.promotion.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      ...(include || {}),
    },
  });

  return promotions;
};

const findById = async (id: number, include?: object) => {
  const promotion = await prisma.promotion.findUnique({
    include: {
      ...(include || {}),
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });

  return promotion;
};

const save = async (promotion: Promotion, include?: object) => {
  if (promotion.id) {
    return await prisma.promotion.update({
      where: {
        id: promotion.id,
      },
      data: {
        name: promotion.name,
        description: promotion.description,
        start_date: promotion.start_date,
        end_date: promotion.end_date,
        state: promotion.state,
        deleted_at: promotion.deleted_at,
      },
      include: {
        ...(include || {}),
      },
    });
  }
  return await prisma.promotion.create({
    data: {
      name: promotion.name,
      description: promotion.description,
      start_date: promotion.start_date,
      end_date: promotion.end_date,
    },
    include: {
      ...(include || {}),
    },
  });
};

export default {
  findAll,
  findById,
  save,
};
