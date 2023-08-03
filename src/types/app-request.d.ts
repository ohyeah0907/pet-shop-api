import { KeyStore, User } from '@prisma/client';
import { Request } from 'express';

declare interface PublicRequest extends Request {
}

declare interface RoleRequest extends PublicRequest {
  currentRoleTypes: string[];
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: KeyStore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}