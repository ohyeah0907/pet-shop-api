import UserRepository from "../repositories/UserRepository"
import { ObjectState } from "@prisma/client";
import { UserCreate, UserUpdate } from "../dto/user";
import roleService from "./RoleService";
import bcrypt from "bcrypt";

const service = {
    getUserSearch: async (params: any) => {
        return UserRepository.findAll();
    },
    getUserById: async (id: number) => {
        const user = await UserRepository.findById(id);
        if (!user) throw new Error("Không tìm thấy user");
        return user;
    },
    getUserByEmail: async (email: string) => {
    },
    getUserByUserName: async (username: string) => {
        const user = await UserRepository.findByUsername(username);
        if (!user) throw new Error("Không tìm thấy username");
        return user;
    },
    createUser: async (create: UserCreate) => {
        const role = await roleService.getRoleById(create.role.id);
        const user: any = {
            id: 0,
            name: create.name,
            email: create.email,
            phone: create.phone,
            username: create.username,
            password: bcrypt.hashSync(create.password, 10),
            role_id: role.id,
            is_voice: create.is_voice,
        }
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
        if (update.is_admin) {
            user.is_admin = update.is_admin;
        }
        if (update.is_locked) {
            user.is_locked = update.is_locked;
        }
        if (update.role) {
            const role = await roleService.getRoleById(update.role.id);
            user.role_id = role.id;
        }
        if (update.is_voice) {
            user.is_voice = update.is_voice;
        }
        return await UserRepository.save(user);
    },
    deleteUser: async (id: number) => {
        const user: any = await service.getUserById(id);
        user.state = ObjectState.DELETED;
        user.deleted_at = new Date();
        return !!(await UserRepository.save(user));
    }
}

export default service;