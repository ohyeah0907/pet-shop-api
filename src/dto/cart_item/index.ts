import { Accessory, Cart, ObjectState, Pet, User } from "@prisma/client";

export type CartItemSearch = {
  cart: Cart;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type CartItemCreate = {
  cart: Cart;
  pet?: Pet;
  accessory?: Accessory;
  quantity: number;
  total_price: number;
};

export type CartItemUpdate = {
  id: number;
  cart: Cart;
  pet?: Pet;
  accessory?: Accessory;
  quantity: number;
  total_price: number;
};
