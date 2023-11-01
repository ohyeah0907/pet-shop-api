import prisma from "../prisma";
import { PetType, ObjectState } from "@prisma/client";
import { PetTypeSearch } from "../dto/pet_type";

const findAll = async (search: PetTypeSearch) => {
  const condition: any = {
    NOT: {
      state: ObjectState.DELETED,
    },
  };
  if (search.name) {
    condition.name = {
      contains: search.name,
    };
  }
  const petTypes = await prisma.petType.findMany({
    include: {
      pets: true,
      parent: true,
      children: true,
    },
    where: condition,
  });
  return petTypes;
};

const findById = async (id: number) => {
  const petType = await prisma.petType.findUnique({
    include: {
      pets: true,
      parent: true,
      children: true,
    },
    where: {
      id: id,
      NOT: {
        state: ObjectState.DELETED,
      },
    },
  });
  return petType;
};

const save = async (petType: PetType) => {
  if (petType.id) {
    return await prisma.petType.update({
      where: {
        id: petType.id,
      },
      data: {
        name: petType.name,
        parent: petType.parent_id
          ? {
              connect: {
                id: petType.parent_id,
              },
            }
          : undefined,
        state: petType.state,
        deleted_at: petType.deleted_at,
      },
      include: {
        pets: true,
      },
    });
  }
  return await prisma.petType.create({
    data: {
      name: petType.name,
      state: petType.state,
      parent: petType.parent_id
        ? {
            connect: {
              id: petType.parent_id,
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
