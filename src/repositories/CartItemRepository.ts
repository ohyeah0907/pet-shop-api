import prisma from "../prisma";
import { CartItem, ObjectState } from "@prisma/client";
import { CartItemSearch } from "../dto/cart_item";

const findAll = async (search?: CartItemSearch, include?: object) => {
  const condition: any = {};

  if (search?.cart?.id) {
    condition.cart_id = search.cart.id;
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

  const cartItems = await prisma.cartItem.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      cart: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      pet: { select: { name: true } },
      accessory: { select: { name: true } },
      ...(include || {}),
    },
  });

  return cartItems;
};

const findById = async (id: number, include?: object) => {
  const cartItem = await prisma.cartItem.findUnique({
    include: {
      ...(include || {}),
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });

  return cartItem;
};

const save = async (cartItem: CartItem, include?: object) => {
  if (cartItem.id) {
    return await prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: {
        cart: {
          connect: { id: cartItem.cart_id },
        },
        pet: cartItem.pet_id
          ? {
              connect: {
                id: cartItem.pet_id,
              },
            }
          : { disconnect: true },
        accessory: cartItem.accessory_id
          ? {
              connect: {
                id: cartItem.accessory_id,
              },
            }
          : { disconnect: true },
        quantity: cartItem.quantity,
        total_price: cartItem.total_price,
        state: cartItem.state,
        deleted_at: cartItem.deleted_at,
      },
      include: {
        ...(include || {}),
      },
    });
  }
  return await prisma.cartItem.create({
    data: {
      cart: {
        connect: { id: cartItem.cart_id },
      },
      pet: {
        connect: cartItem.pet_id ? { id: cartItem.pet_id } : undefined,
      },
      accessory: {
        connect: cartItem.accessory_id
          ? { id: cartItem.accessory_id }
          : undefined,
      },
      quantity: cartItem.quantity,
      total_price: cartItem.total_price,
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
