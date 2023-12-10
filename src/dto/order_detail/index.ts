import { Accessory, ObjectState, Order, Pet } from "@prisma/client";

export type OrderDetailSearch = {
  order?: Order;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type OrderDetailCreate = {
  order: Order;
  pet?: Pet;
  accessory?: Accessory;
  quantity: number;
  price?: number;
};

export type OrderDetailUpdate = {
  id: number;
  order: Order;
  pet?: Pet;
  accessory?: Accessory;
  quantity: number;
  price: number;
};
