import { Tokens } from "../../types/app-request";

export type AuthLogin = {
  email: string;
  password: string;
};

export type AuthRegister = {
  email: string;
  password: string;
  username: string;
  phone: string;
  address: string;
};

export type AuthResend = {
  email: string;
};

export type AuthReset = {
  email: string;
};

export type AuthLoginResponse = {
  tokens: Tokens;
  user: UserInfo;
};

export type UserInfo = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  is_admin: boolean;
  username: string;
};
export type RefreshTokenResponse = {
  access_token: string;
};
