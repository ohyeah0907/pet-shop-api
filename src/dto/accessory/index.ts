import { AccessoryType, ObjectState } from "@prisma/client";

export type AccessorySearch = {
  name?: string;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
  inSkus?: number[];
};

export type AccessoryCreate = {
  sku: string;
  name: string;
  stock_quantity: number;
  price: number;
  thumbnail_image: string;
  description_images: string[];
  origin: string;
  description: string;
  weight: number;
  type: AccessoryType;
};

export type AccessoryUpdate = {
  id: number;
  sku: string;
  name: string;
  stock_quantity: number;
  price: number;
  thumbnail_image: string;
  description_images: string[];
  origin: string;
  description: string;
  weight: number;
  type: AccessoryType;
};
