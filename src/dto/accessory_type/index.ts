import { AccessoryType, ObjectState } from "@prisma/client";

export type AccessoryTypeSearch = {
  name?: string;
  parent?: AccessoryType;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type AccessoryTypeCreate = {
  name: String;
  parent?: AccessoryType;
};

export type AccessoryTypeUpdate = {
  id: number;
  name: String;
  parent?: AccessoryType;
  state?: ObjectState;
};
