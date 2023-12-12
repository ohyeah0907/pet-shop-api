import prisma from "../prisma";
import { Order, ObjectState } from "@prisma/client";
import { OrderSearch } from "../dto/order";

const findAll = async (search?: OrderSearch, include?: object) => {
  const condition: any = {};

  if (search?.user?.id) {
    condition.user_id = search.user.id;
  }
  if (search?.order_status) {
    condition.order_status = search.order_status;
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

  const orders = await prisma.order.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      user: true,
      ...(include || {}),
    },
  });

  return orders;
};

const findById = async (id: number, include?: object) => {
  const order = await prisma.order.findUnique({
    include: {
      ...(include || {}),
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });

  return order;
};

const save = async (order: Order, include?: object) => {
  if (order.id) {
    return await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        user: {
          connect: { id: order.user_id },
        },
        order_status: order.order_status,
        payment: order.payment,
        state: order.state,
        deleted_at: order.deleted_at,
      },
      include: {
        ...(include || {}),
      },
    });
  }
  return await prisma.order.create({
    data: {
      user: {
        connect: { id: order.user_id },
      },
      order_status: order.order_status,
      payment: order.payment,
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
