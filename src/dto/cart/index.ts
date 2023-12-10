import { ObjectState, User } from "@prisma/client";

export type CartSearch = {
  user?: User;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type CartCreate = {
  user: User;
  total_quantity: number;
  total_price: number;
};

export type CartUpdate = {
  id: number;
  user: User;
  total_quantity: number;
  total_price: number;
  state?: ObjectState;
};
