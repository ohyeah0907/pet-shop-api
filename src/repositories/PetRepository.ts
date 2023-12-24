import prisma from "../prisma";
import { Pet, ObjectState } from "@prisma/client";
import { PetSearch } from "../dto/pet";

const findAll = async (search: PetSearch, include?: object) => {
  const condition: any = {};
  if ("name" in search) {
    console.log("search.name :>> ", search.name);
    condition.name = search.name
      ? { contains: `${search.name}`, mode: "insensitive" }
      : null;
  }
  if (search?.type?.id) {
    condition.type_id = search.type.id;
  }
  if (search?.state) {
    condition.state = search.state;
  }
  if (search?.someStates && Array.isArray(search.someStates)) {
    condition.state = {
      in: search.someStates,
    };
  }
  if (search?.notInIds && Array.isArray(search.notInIds)) {
    condition.id = {
      notIn: search.notInIds,
    };
  }

  const pets = await prisma.pet.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      type: {
        select: {
          id: true,
          name: true,
          parent: true,
        },
      },
      ...(include || {}),
    },
  });
  return pets;
};

const findById = async (id: number) => {
  const pet = await prisma.pet.findUnique({
    where: {
      id: id,
      NOT: {
        state: ObjectState.DELETED,
      },
    },
    include: {
      type: {
        select: {
          id: true,
          name: true,
          parent: true,
        },
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
        description_images: pet.description_images,
        birthday: pet.birthday,
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
      description_images: pet.description_images,
      birthday: pet.birthday,
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
