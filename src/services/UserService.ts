import UserRepository from "../repositories/UserRepository";
import { ObjectState } from "@prisma/client";
import { UserCreate, UserUpdate } from "../dto/user";
import bcrypt from "bcrypt";

const service = {
  getUserSearch: async (search: any) => {
    return UserRepository.findAll(search);
  },
  getUserById: async (id: number) => {
    const user = await UserRepository.findById(id);
    if (!user) throw new Error("Không tìm thấy user");
    return user;
  },
  getUserByVerificationToken: async (token: string) => {
    const user = await UserRepository.findByVerificationToken(token);
    return user;
  },
  getUserByEmail: async (email: string) => {
    const user = await UserRepository.findByEmail(email);
    if (!user) throw new Error("Không tìm thấy email");
    return user;
  },
  getUserByUserName: async (username: string) => {
    const user = await UserRepository.findByUsername(username);
    if (!user) throw new Error("Không tìm thấy username");
    return user;
  },
  createUser: async (create: UserCreate) => {
    const user: any = {
      id: 0,
      name: create.name,
      email: create.email,
      phone: create.phone,
      username: create.username,
      verification_token: create.verification_token || "",
      password: bcrypt.hashSync(create.password, 10),
      is_locked: create.is_locked || false,
      is_verified: create.is_verified || false,
      is_admin: create.is_admin || false,
    };
    return await UserRepository.save(user);
  },
  updateUser: async (update: UserUpdate) => {
    const user: any = await service.getUserById(update.id);

    if (update.name) {
      user.name = update.name;
    }
    if (update.email) {
      user.email = update.email;
    }
    if (update.phone) {
      user.phone = update.phone;
    }
    if (update.username) {
      user.username = update.username;
    }
    if (update.password) {
      user.password = update.password;
    }
    if (update.is_admin !== null) {
      user.is_admin = update.is_admin;
    }
    if (update.is_locked !== null) {
      user.is_locked = update.is_locked;
    }
    if (update.is_verified !== null) {
      user.is_verified = update.is_verified;
    }
    if (update.verification_token) {
      user.verification_token = update.verification_token;
    }
    return await UserRepository.save(user);
  },
  deleteUser: async (id: number) => {
    const user: any = await service.getUserById(id);
    user.state = ObjectState.DELETED;
    user.deleted_at = new Date();
    return !!(await UserRepository.save(user));
  },
};

export default service;
