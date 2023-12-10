import { ObjectState } from "@prisma/client";
import {
  CartItemCreate,
  CartItemSearch,
  CartItemUpdate,
} from "../dto/cart_item";
import CartItemRepository from "../repositories/CartItemRepository";
import CartService from "./CartService";
import PetService from "./PetService";
import AccessoryService from "./AccessoryService";

const service = {
  getSearch: async (search?: CartItemSearch, include?: object) => {
    return CartItemRepository.findAll(search, include);
  },
  getById: async (id: number) => {
    const cartItem = await CartItemRepository.findById(id);
    if (!cartItem) throw new Error("Không tìm thấy cart item");
    return cartItem;
  },
  create: async (create: CartItemCreate) => {
    const cart = await CartService.getById(create.cart?.id);
    if (create.pet?.id) {
      const pet = await PetService.getById(create.pet?.id);
    }
    if (create.accessory?.id) {
      const accessory = await AccessoryService.getById(create.accessory?.id);
    }

    const cartItem: any = {
      id: 0,
      cart_id: cart.id,
      pet_id: create.pet?.id,
      accessory_id: create.accessory?.id,
      quantity: create.quantity,
      total_price: create.total_price,
    };

    const created = await CartItemRepository.save(cartItem);

    return created;
  },
  update: async (update: CartItemUpdate) => {
    const cartItem = await service.getById(update.id);
    const cart = await CartService.getById(update.cart.id);
    cartItem.cart_id = cart.id;

    if (update.pet?.id) {
      const pet = await PetService.getById(update.pet.id);
      cartItem.pet_id = pet.id;
      cartItem.accessory_id = null;
    }
    if (update.accessory?.id) {
      const accessory = await AccessoryService.getById(update.accessory.id);
      cartItem.accessory_id = accessory.id;
      cartItem.pet_id = null;
    }

    cartItem.quantity = update.quantity;
    cartItem.total_price = update.total_price;

    return await CartItemRepository.save(cartItem);
  },
  delete: async (id: number) => {
    const cartItem: any = await service.getById(id);

    cartItem.state = ObjectState.DELETED;
    cartItem.deleted_at = new Date();

    return !!(await CartItemRepository.save(cartItem));
  },
};

export default service;
