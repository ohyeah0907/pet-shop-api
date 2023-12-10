import { Accessory, ObjectState, Pet, Promotion } from "@prisma/client";

export type ProductPromotionSearch = {
  pet: Pet;
  accessory: Accessory;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type ProductPromotionCreate = {
  pet: Pet;
  accessory: Accessory;
  promotion: Promotion;
};

export type ProductPromotionUpdate = {
  id: number;
  pet?: Pet;
  accessory?: Accessory;
  promotion: Promotion;
};
