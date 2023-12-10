import { ObjectState } from "@prisma/client";
import CartRepository from "../repositories/CartRepository";
import UserService from "./UserService";
import { CartCreate, CartSearch, CartUpdate } from "../dto/cart";

const service = {
  getSearch: async (search?: CartSearch, include?: object) => {
    return CartRepository.findAll(search, include);
  },
  getById: async (id: number) => {
    const cart = await CartRepository.findById(id);
    if (!cart) throw new Error("Không tìm thấy cart");
    return cart;
  },
  create: async (create: CartCreate) => {
    const user = await UserService.getUserById(create.user.id);

    const cart: any = {
      id: 0,
      user_id: user.id,
      total_quantity: create.total_quantity,
      total_price: create.total_price,
    };
    const created = await CartRepository.save(cart);

    return created;
  },
  update: async (update: CartUpdate) => {
    const cart = await service.getById(update.id);
    const user = await UserService.getUserById(update.user.id);
    cart.user_id = user.id;

    cart.total_price = update.total_price;
    cart.total_quantity = update.total_quantity;

    return await CartRepository.save(cart);
  },
  delete: async (id: number) => {
    const cart: any = await service.getById(id);

    cart.state = ObjectState.DELETED;
    cart.deleted_at = new Date();

    return !!(await CartRepository.save(cart));
  },
};

export default service;
