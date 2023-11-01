import { Accessory, AccessoryType } from "@prisma/client";

export type AccessoryTypeCreate = {
  name: String;
  parent?: AccessoryType;
};

export type AccessoryTypeUpdate = {
  id: number;
  name: String;
  parent?: AccessoryType;
};
