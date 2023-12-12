import prisma from "../prisma";
import { ProductFeedbackSearch } from "../dto/product_feedback";
import { ProductFeedback, ObjectState } from "@prisma/client";

const findAll = async (search?: ProductFeedbackSearch, include?: object) => {
  const condition: any = {};

  if (search?.user?.id) {
    condition.user_id = search.user.id;
  }
  if (search?.pet?.id) {
    condition.pet_id = search.pet.id;
  }
  if (search?.accessory?.id) {
    condition.accessory_id = search.accessory.id;
  }
  if (search?.state) {
    condition.state = search.state;
  }
  if (search?.someStates && Array.isArray(search.someStates)) {
    condition.state = {
      in: search.someStates,
    };
  }
  if (search?.notInIds && Array.isArray(search.notInIds)) {
    condition.id = {
      notIn: search.notInIds,
    };
  }

  const productFeedbacks = await prisma.productFeedback.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      user: true,
      pet: true,
      accessory: true,
      ...(include || {}),
    },
  });

  return productFeedbacks;
};

const findById = async (id: number, include?: object) => {
  const productFeedback = await prisma.productFeedback.findUnique({
    include: {
      user: true,
      pet: true,
      accessory: true,
      ...(include || {}),
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });

  return productFeedback;
};

const save = async (productFeedback: ProductFeedback, include?: object) => {
  if (productFeedback.id) {
    return await prisma.productFeedback.update({
      where: {
        id: productFeedback.id,
      },
      data: {
        user: {
          connect: {
            id: productFeedback.user_id,
          },
        },
        pet: productFeedback.pet_id
          ? {
              connect: {
                id: productFeedback.pet_id,
              },
            }
          : { disconnect: true },
        accessory: productFeedback.accessory_id
          ? {
              connect: {
                id: productFeedback.accessory_id,
              },
            }
          : { disconnect: true },
        content: productFeedback.content,
        rating: productFeedback.rating,
        deleted_at: productFeedback.deleted_at,
        state: productFeedback.state,
      },
      include: {
        user: true,
        pet: true,
        accessory: true,
        ...(include || {}),
      },
    });
  }

  return await prisma.productFeedback.create({
    data: {
      user: {
        connect: { id: productFeedback.user_id },
      },
      pet: {
        connect: productFeedback.pet_id
          ? { id: productFeedback.pet_id }
          : undefined,
      },
      accessory: {
        connect: productFeedback.accessory_id
          ? { id: productFeedback.accessory_id }
          : undefined,
      },
      content: productFeedback.content,
      rating: productFeedback.rating,
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
