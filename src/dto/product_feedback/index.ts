import { Accessory, ObjectState, Pet, User } from "@prisma/client";

export type ProductFeedbackSearch = {
  user?: User;
  pet: Pet;
  accessory: Accessory;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type ProductFeedbackCreate = {
  pet: Pet;
  accessory: Accessory;
  user: User;
  content: string;
  rating: number;
};

export type ProductFeedbackUpdate = {
  id: number;
  pet?: Pet;
  accessory?: Accessory;
  user: User;
  content: string;
  rating: number;
};
