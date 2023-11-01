import { Accessory, AccessoryType } from "@prisma/client";

export type AccessoryCreate = {
  name: string;
  stock_quantity: number;
  price: number;
  thumbnail_image: string;
  description_image: string[];
  origin: string;
  description: string;
  type: AccessoryType;
};

export type AccessoryUpdate = {
  id: number;
  name?: string;
  stock_quantity?: number;
  price?: number;
  thumbnail_image?: string;
  description_image?: string[];
  origin?: string;
  description?: string;
  type?: AccessoryType;
};
