import { ObjectState } from "@prisma/client";
import {
  OrderDetailCreate,
  OrderDetailSearch,
  OrderDetailUpdate,
} from "../dto/order_detail";
import OrderDetailRepository from "../repositories/OrderDetailRepository";
import OrderService from "./OrderService";
import PetService from "./PetService";
import AccessoryService from "./AccessoryService";

const service = {
  getSearch: async (search?: OrderDetailSearch, include?: object) => {
    return OrderDetailRepository.findAll(search, include);
  },
  getById: async (id: number) => {
    const orderDetail = await OrderDetailRepository.findById(id);
    if (!orderDetail) throw new Error("Không tìm thấy order detail");
    return orderDetail;
  },
  getAllOrderDetailByOrderId: async (id: number) => {
    const orderDetails = await OrderDetailRepository.findByOrderId(id);
    if (!orderDetails) throw new Error("Không tìm thấy order detail");
    const result = {
      order: orderDetails[0].order,
      items: orderDetails.map((item) => {
        const { order, ...rest } = item;
        return rest;
      }),
    };
    return result;
  },
  create: async (create: OrderDetailCreate) => {
    const order = await OrderService.getById(create.order?.id);
    if (create.pet?.id) {
      const pet = await PetService.getById(create.pet?.id);
    }
    if (create.accessory?.id) {
      const accessory = await AccessoryService.getById(create.accessory?.id);
    }

    const orderDetail: any = {
      id: 0,
      order_id: order.id,
      pet_id: create.pet?.id,
      accessory_id: create.accessory?.id,
      quantity: create.quantity,
      price: create.price,
    };
    const created = await OrderDetailRepository.save(orderDetail);

    return created;
  },
  update: async (update: OrderDetailUpdate) => {
    const orderDetail = await service.getById(update.id);
    const order = await OrderService.getById(update.order!.id);
    orderDetail.order_id = order.id;

    if (update.pet?.id) {
      const pet = await PetService.getById(update.pet!.id);
      orderDetail.pet_id = pet.id;
      orderDetail.accessory_id = null;
    }
    if (update.accessory?.id) {
      const accessory = await AccessoryService.getById(update.accessory!.id);
      orderDetail.accessory_id = accessory.id;
      orderDetail.pet_id = null;
    }
    orderDetail.quantity = update.quantity;
    orderDetail.price = update.price;

    return await OrderDetailRepository.save(orderDetail);
  },
  getByOrderId: async (orderId: number) => {
    return await OrderDetailRepository.findByOrderId(orderId);
  },
  delete: async (id: number) => {
    const orderDetail: any = await service.getById(id);
    orderDetail.state = ObjectState.DELETED;
    orderDetail.deleted_at = new Date();
    return !!(await OrderDetailRepository.save(orderDetail));
  },
};

export default service;
