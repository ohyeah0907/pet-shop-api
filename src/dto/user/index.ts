import { ObjectState } from "@prisma/client";

export type UserCreate = {
  name: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  is_voice: boolean;
  verification_token: string;
};

export type UserUpdate = {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  username?: string;
  password?: string;
  is_admin?: boolean;
  is_locked?: boolean;
  is_voice?: boolean;
  is_verified?: boolean;
};

export type UserSearch = {
  state?: ObjectState;
  someStates?: ObjectState[];
  notInIds?: number[];
};
