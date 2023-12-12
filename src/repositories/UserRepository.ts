import { UserSearch } from "../dto/user";
import prisma from "../prisma";
import { User, ObjectState } from "@prisma/client";

const findAll = async (search: UserSearch) => {
  const conditions: any = {};
  if (search.state) {
    conditions.state = search.state;
  }
  if (search.someStates && Array.isArray(search.someStates)) {
    conditions.state = {
      in: search.someStates,
    };
  }
  if (search.notInIds && Array.isArray(search.notInIds)) {
    conditions.id = {
      notIn: search.notInIds,
    };
  }

  const users = await prisma.user.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...conditions,
    },
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      avatar_url: true,
      created_at: true,
      email: true,
      phone: true,
      verification_token: true,
      name: true,
      is_verified: true,
      is_admin: true,
      is_locked: true,
    },
  });
  return users;
};

const findById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
      NOT: {
        state: ObjectState.DELETED,
      },
    },
    select: {
      id: true,
      avatar_url: true,
      created_at: true,
      email: true,
      phone: true,
      verification_token: true,
      name: true,
      is_verified: true,
      is_admin: true,
      is_locked: true,
    },
  });
  return user;
};
const findByUsername = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
      NOT: {
        state: ObjectState.DELETED,
      },
    },
  });
  return user;
};

const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      NOT: {
        state: ObjectState.DELETED,
      },
    },
  });
  return user;
};

const findByVerificationToken = async (token: string) => {
  const user = await prisma.user.findFirst({
    where: {
      verification_token: token,
      NOT: {
        state: ObjectState.DELETED,
      },
    },
  });
  return user;
};

const findByVoiceUsername = async (username: string) => {
  const user = await prisma.user.findFirst({
    where: {
      username: username,
      NOT: {
        state: ObjectState.DELETED,
      },
    },
  });
  return user;
};

const save = async (user: User) => {
  if (user.id) {
    return await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar_url: user.avatar_url,
        username: user.username,
        password: user.password,
        is_locked: user.is_locked,
        verification_token: user.verification_token,
        is_admin: user.is_admin,
        is_verified: user.is_verified,
        state: user.state,
        deleted_at: user.deleted_at,
        updated_at: user.updated_at,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        verification_token: true,
        email: true,
        username: true,
      },
    });
  }
  return await prisma.user.create({
    data: {
      name: user.name,
      phone: user.phone,
      email: user.email,
      avatar_url: user.avatar_url,
      username: user.username,
      facebook_id: user.facebook_id,
      google_id: user.google_id,
      verification_token: user.verification_token,
      password: user.password,
      is_locked: user.is_locked,
      is_verified: user.is_verified,
      is_admin: user.is_admin,
    },
    select: {
      id: true,
      name: true,
      email: true,
      verification_token: true,
      created_at: true,
      updated_at: true,
      deleted_at: true,
      state: true,
    },
  });
};

export default {
  findAll,
  findById,
  findByUsername,
  findByEmail,
  findByVoiceUsername,
  findByVerificationToken,
  save,
};
