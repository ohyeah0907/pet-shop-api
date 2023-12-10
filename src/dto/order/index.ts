import { ObjectState, OrderStatus, Payment, User } from "@prisma/client";

export type OrderSearch = {
  user?: User;
  order_status?: OrderStatus;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type OrderCreate = {
  user: User;
  order_status: OrderStatus;
  payment: string;
};

export type OrderUpdate = {
  id: number;
  // user?: User;
  order_status: OrderStatus;
  payment: Payment;
};
