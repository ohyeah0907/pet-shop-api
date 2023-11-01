import prisma from "../prisma";
import { Pet, ObjectState } from "@prisma/client";
import { PetSearch } from "../dto/pet";

const findAll = async (search: PetSearch) => {
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

  if (search.type) {
    if (search.type.id) {
      condition.type = {
        id: search.type.id,
      };
    }
  }

  const pets = await prisma.pet.findMany({
    include: {
      type: true,
    },
    where: condition,
  });
  return pets;
};

const findById = async (id: number) => {
  const pet = await prisma.pet.findUnique({
    include: {
      type: true,
    },
    where: {
      id: id,
      NOT: {
        state: ObjectState.DELETED,
      },
    },
  });
  return pet;
};

const save = async (pet: Pet) => {
  if (pet.id) {
    return await prisma.pet.update({
      where: {
        id: pet.id,
      },
      data: {
        name: pet.name,
        sku: pet.sku,
        age: pet.age,
        color: pet.color,
        height: pet.height,
        weight: pet.weight,
        price: pet.price,
        stock_quantity: pet.stock_quantity,
        thumbnail_image: pet.thumbnail_image,
        description_image: pet.description_image,
        birth_date: pet.birth_date,
        origin: pet.origin,
        description: pet.description,
        isMale: pet.isMale,
        type: {
          connect: {
            id: pet.type_id,
          },
        },
        state: pet.state,
        deleted_at: pet.deleted_at,
      },
      include: {
        type: true,
      },
    });
  }
  return await prisma.pet.create({
    data: {
      name: pet.name,
      sku: pet.sku,
      age: pet.age,
      color: pet.color,
      height: pet.height,
      weight: pet.weight,
      price: pet.price,
      stock_quantity: pet.stock_quantity,
      thumbnail_image: pet.thumbnail_image,
      description_image: pet.description_image,
      birth_date: pet.birth_date,
      origin: pet.origin,
      description: pet.description,
      isMale: pet.isMale,
      type: {
        connect: {
          id: pet.type_id,
        },
      },
      state: pet.state,
    },
  });
};

export default {
  findAll,
  findById,
  save,
};
