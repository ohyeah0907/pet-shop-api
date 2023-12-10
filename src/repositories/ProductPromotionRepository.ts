import prisma from "../prisma";
import { ProductPromotionSearch } from "../dto/product_promotion";
import { ProductPromotion, ObjectState } from "@prisma/client";

const findAll = async (search?: ProductPromotionSearch, include?: object) => {
  const condition: any = {};

  if (search?.pet) {
    condition.pet_id = search.pet.id;
  }
  if (search?.accessory) {
    condition.accessory_id = search.accessory.id;
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

  const productPromotions = await prisma.productPromotion.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      pet: true,
      accessory: true,
      promotion: true,
      ...(include || {}),
    },
  });

  return productPromotions;
};

const findById = async (id: number, include?: object) => {
  const productPromotion = await prisma.productPromotion.findUnique({
    include: {
      ...(include || {}),
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });

  return productPromotion;
};

const save = async (productPromotion: ProductPromotion, include?: object) => {
  if (productPromotion.id) {
    return await prisma.productPromotion.update({
      where: {
        id: productPromotion.id,
      },
      data: {
        pet: productPromotion.pet_id
          ? {
              connect: {
                id: productPromotion.pet_id,
              },
            }
          : { disconnect: true },
        accessory: productPromotion.accessory_id
          ? {
              connect: {
                id: productPromotion.accessory_id,
              },
            }
          : { disconnect: true },
        promotion: {
          connect: {
            id: productPromotion.promotion_id,
          },
        },
        state: productPromotion.state,
        deleted_at: productPromotion.deleted_at,
      },
      include: {
        ...(include || {}),
      },
    });
  }
  return await prisma.productPromotion.create({
    data: {
      pet: {
        connect: productPromotion.pet_id
          ? { id: productPromotion.pet_id }
          : undefined,
      },
      accessory: {
        connect: productPromotion.accessory_id
          ? { id: productPromotion.accessory_id }
          : undefined,
      },
      promotion: {
        connect: {
          id: productPromotion.promotion_id,
        },
      },
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
