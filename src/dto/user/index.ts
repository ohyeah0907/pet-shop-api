import { ObjectState } from "@prisma/client";

export type UserCreate = {
  name: string;
  email: string;
  phone: string;
  address: string;
  username: string;
  password: string;
  is_admin: boolean;
  is_locked: boolean;
  is_verified: boolean;
  verification_token: string;
};

export type UserUpdate = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  username?: string;
  password?: string;
  is_locked?: boolean;
  is_admin?: boolean;
  is_verified?: boolean;
  verification_token: string;
};

export type UserSearch = {
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};
