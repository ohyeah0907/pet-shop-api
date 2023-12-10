import { AccessoryTypeSearch } from "../dto/accessory_type";
import prisma from "../prisma";
import { AccessoryType, ObjectState } from "@prisma/client";

const findAll = async (search?: AccessoryTypeSearch, include?: object) => {
  const condition: any = {};

  if (search?.name) {
    condition.name = {
      contains: search.name,
    };
  }
  if (search?.parent) {
    condition.parent_id = search.parent.id;
  }
  if (search?.state) {
    condition.state = search.state;
  }
  if (search?.someStates) {
    condition.state = {
      in: search.someStates,
    };
  }
  if (search?.notInIds && Array.isArray(search.notInIds)) {
    condition.id = {
      notIn: search.notInIds,
    };
  }

  const accessoryTypes = await prisma.accessoryType.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      accessories: true,
      parent: true,
      children: true,
      ...(include || {}),
    },
  });

  return accessoryTypes;
};

const findById = async (id: number, include?: object) => {
  const accessoryType = await prisma.accessoryType.findUnique({
    include: {
      ...(include || {}),
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });
  return accessoryType;
};

const save = async (accessoryType: AccessoryType, include?: object) => {
  if (accessoryType.id) {
    return await prisma.accessoryType.update({
      where: {
        id: accessoryType.id,
      },
      data: {
        name: accessoryType.name,
        parent: accessoryType.parent_id
          ? {
              connect: {
                id: accessoryType.parent_id,
              },
            }
          : undefined,
        state: accessoryType.state,
        deleted_at: accessoryType.deleted_at,
      },
      include: {
        ...(include || {}),
      },
    });
  }
  return await prisma.accessoryType.create({
    data: {
      name: accessoryType.name,
      state: accessoryType.state,
      parent: accessoryType.parent_id
        ? {
            connect: {
              id: accessoryType.parent_id,
            },
          }
        : undefined,
    },
    include: {
      ...(include || {}),
    },
  });
};

export default {
  findAll,
  findById,
  save,
};
