import { CartSearch } from "../dto/cart";
import { Cart, ObjectState } from "@prisma/client";
import prisma from "../prisma";

const findAll = async (search?: CartSearch, include?: object) => {
  const condition: any = {};

  if (search?.user?.id) {
    condition.user_id = search.user.id;
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

  const carts = await prisma.cart.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      user: true,
      ...(include || {}),
    },
  });

  return carts;
};

const findById = async (id: number, include?: object) => {
  const cart = await prisma.cart.findUnique({
    include: {
      ...(include || {}),
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });

  return cart;
};

const save = async (cart: Cart, include?: object) => {
  if (cart.id) {
    return await prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: {
        user: {
          connect: { id: cart.user_id },
        },
        total_quantity: cart.total_quantity,
        total_price: cart.total_price,
        state: cart.state,
        deleted_at: cart.deleted_at,
      },
      include: {
        ...(include || {}),
      },
    });
  }
  return await prisma.cart.create({
    data: {
      user: {
        connect: { id: cart.user_id },
      },
      total_quantity: cart.total_quantity,
      total_price: cart.total_price,
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
