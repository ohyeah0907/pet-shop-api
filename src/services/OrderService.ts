import { ObjectState } from "@prisma/client";
import { OrderCreate, OrderSearch, OrderUpdate } from "../dto/order";
import OrderRepository from "../repositories/OrderRepository";
import UserService from "./UserService";

const service = {
  getSearch: async (search?: OrderSearch, include?: object) => {
    return OrderRepository.findAll(search, include);
  },
  getById: async (id: number) => {
    const order = await OrderRepository.findById(id);
    if (!order) throw new Error("Không tìm thấy order");
    return order;
  },
  create: async (create: OrderCreate) => {
    const user = await UserService.getUserById(create.user?.id);

    const order: any = {
      id: 0,
      user_id: user.id,
      order_status: create.order_status,
      payment: create.payment,
    };
    const created = await OrderRepository.save(order);

    return created;
  },
  update: async (update: OrderUpdate) => {
    const order = await service.getById(update.id);

    order.order_status = update.order_status;
    order.payment = update.payment;

    return await OrderRepository.save(order);
  },
  delete: async (id: number) => {
    const order: any = await service.getById(id);

    order.state = ObjectState.DELETED;
    order.deleted_at = new Date();

    return !!(await OrderRepository.save(order));
  },
};

export default service;
