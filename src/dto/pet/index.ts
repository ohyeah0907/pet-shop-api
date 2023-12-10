import { ObjectState, Pet, PetType } from "@prisma/client";

export type PetSearch = {
  name?: string;
  type?: PetType;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type PetCreate = {
  name: string;
  sku: string;
  stock_quantity: number;
  price: number;
  thumbnail_image: string;
  description_images: string[];
  age: number;
  isMale: boolean;
  color: string;
  weight: number;
  height: number;
  birthday: Date;
  origin: string;
  description: string;
  type: PetType;
};

export type PetUpdate = {
  id: number;
  name: string;
  sku: string;
  stock_quantity: number;
  price: number;
  thumbnail_image: string;
  description_images: string[];
  age: number;
  isMale: boolean;
  color: string;
  weight: number;
  height: number;
  birthday: Date;
  origin: string;
  description: string;
  type: PetType;
};
