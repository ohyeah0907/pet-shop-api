import { OrderDetailSearch } from "../dto/order_detail";
import prisma from "../prisma";
import { OrderDetail, ObjectState } from "@prisma/client";

const findAll = async (search?: OrderDetailSearch, include?: object) => {
  const condition: any = {};

  if (search?.order?.id) {
    condition.order_id = search.order.id;
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

  const orderDetails = await prisma.orderDetail.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      pet: { select: { name: true, stock_quantity: true, state: true } },
      accessory: { select: { name: true, stock_quantity: true, state: true } },
      order: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      },
      ...(include || {}),
    },
  });

  return orderDetails;
};

const findById = async (id: number, include?: object) => {
  const orderDetail = await prisma.orderDetail.findUnique({
    include: {
      ...(include || {}),
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });

  return orderDetail;
};
const findByOrderId = async (orderId: number, include?: object) => {
  const orderDetail = await prisma.orderDetail.findMany({
    where: {
      order_id: orderId,
      state: ObjectState.ACTIVE,
    },
    include: {
      order: {
        select: {
          order_status: true,
          code: true,
          payment: true,
          total: true,
          created_at: true,
        },
      },
      pet: {
        select: {
          id: true,
          name: true,
          stock_quantity: true,
          price: true,
          description_images: true,
          thumbnail_image: true,
          description: true,
          state: true,
        },
      },
      accessory: {
        select: {
          id: true,
          name: true,
          stock_quantity: true,
          price: true,
          description_images: true,
          thumbnail_image: true,
          description: true,
          state: true,
        },
      },
      ...(include || {}),
    },
  });

  return orderDetail;
};

const save = async (orderDetail: OrderDetail, include?: object) => {
  if (orderDetail.id) {
    return await prisma.orderDetail.update({
      where: {
        id: orderDetail.id,
      },
      data: {
        order: {
          connect: {
            id: orderDetail.order_id,
          },
        },
        pet: orderDetail.pet_id
          ? {
              connect: {
                id: orderDetail.pet_id,
              },
            }
          : { disconnect: true },
        accessory: orderDetail.accessory_id
          ? {
              connect: {
                id: orderDetail.accessory_id,
              },
            }
          : { disconnect: true },
        quantity: orderDetail.quantity,
        price: orderDetail.price,
        state: orderDetail.state,
        deleted_at: orderDetail.deleted_at,
      },
      include: {
        ...(include || {}),
      },
    });
  }
  return await prisma.orderDetail.create({
    data: {
      order: {
        connect: {
          id: orderDetail.order_id,
        },
      },
      pet: {
        connect: orderDetail.pet_id ? { id: orderDetail.pet_id } : undefined,
      },
      accessory: {
        connect: orderDetail.accessory_id
          ? { id: orderDetail.accessory_id }
          : undefined,
      },
      quantity: orderDetail.quantity,
      price: orderDetail.price,
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
  findByOrderId,
};
