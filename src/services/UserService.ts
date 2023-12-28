import UserRepository from "../repositories/UserRepository";
import { ObjectState, User } from "@prisma/client";
import { UserCreate, UserUpdate } from "../dto/user";
import recombeeClient from "../recombee";
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
  // getUserByUserName: async (username: string) => {
  //   const user = await UserRepository.findByUsername(username);
  //   if (!user) throw new Error("Không tìm thấy username");
  //   return user;
  // },
  createUser: async (create: UserCreate) => {
    const user: any = {
      id: 0,
      name: create.name,
      email: create.email,
      phone: create.phone,
      address: create.address || "",
      username: create.username,
      gender: create.gender,
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
    if (update.gender) {
      user.gender = update.gender;
    }
    if (update.address) {
      user.address = update.address;
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
  createUserPropertiesToRecombee: async (data: {
    [key: string]:
      | "int"
      | "double"
      | "string"
      | "boolean"
      | "timestamp"
      | "set"
      | "image"
      | "imageList";
  }) => {
    return await Promise.all(
      Object.keys(data).map(async (item) => {
        const field = item;
        const requestRecombee = new recombeeClient.rqs.AddUserProperty(
          field,
          data[field],
        );
        requestRecombee.timeout = 10000;
        return await recombeeClient.client.send(requestRecombee);
      }),
    )
      .then((res) => ({
        success: true,
        message: "Thêm property user thành công",
      }))
      .catch((err) => ({
        success: false,
        message: "Thêm property user thất bại",
      }));
  },
  createUserToRecombee: async (user: User) => {
    const result = {
      success: false,
      message: "",
    };
    if (user.id && user.email && user.username) {
      const requestRecombee = new recombeeClient.rqs.SetUserValues(
        `${user.id}`,
        { email: user.email, username: user.username },
        {
          cascadeCreate: true,
        },
      );
      requestRecombee.timeout = 10000;

      await recombeeClient.client
        .send(requestRecombee)
        .then((response) => {
          console.log("response :>> ", response);
          result.success = true;
          result.message = "Thêm user thành công vào recombee";
        })
        .catch((error) => {
          console.log("error :>> ", error);
          result.message = "Thêm pet thất bại vào recombee";
        });
    } else {
      result.message = "Thiếu field khi thêm pet vào recombee";
    }

    return result;
  },
};

export default service;
