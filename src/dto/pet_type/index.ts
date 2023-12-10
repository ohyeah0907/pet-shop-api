import { ObjectState, PetType } from "@prisma/client";

export type PetTypeSearch = {
  name?: String;
  parent?: PetType;
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};

export type PetTypeCreate = {
  name: String;
  parent?: PetType;
};

export type PetTypeUpdate = {
  id: number;
  name: String;
  parent?: PetType;
};
