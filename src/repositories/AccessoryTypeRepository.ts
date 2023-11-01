import prisma from "../prisma";
import { AccessoryType, ObjectState } from "@prisma/client";

const findAll = async (search?: object, include?: object) => {
  const condition: any = {
    ...(search || {}),
  };

  const accessoryTypes = await prisma.accessoryType.findMany({
    where: condition,
    include: {
      accessories: true,
      parent: true,
      children: true,
      ...(include || {}),
    },
  });

  return accessoryTypes;
};

const findById = async (id: number) => {
  const accessoryType = await prisma.accessoryType.findUnique({
    include: {
      accessories: true,
      parent: true,
      children: true,
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });
  return accessoryType;
};

const save = async (accessoryType: AccessoryType) => {
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
        accessories: true,
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
  });
};

export default {
  findAll,
  findById,
  save,
};
