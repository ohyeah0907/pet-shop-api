import { Accessory, ObjectState, Pet, Promotion } from "@prisma/client";

export type PromotionSearch = {
  name?: string;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type PromotionCreate = {
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
};

export type PromotionUpdate = {
  id: number;
  name: string;
  description: string;
  start_date: Date;
  end_date: Date;
};
