import prisma from "../prisma";
import { Accessory, ObjectState } from "@prisma/client";

const findAll = async (search?: object, include?: object) => {
  const condition: any = {
    ...(search || {}),
  };

  const Accessorys = await prisma.accessory.findMany({
    where: condition,
    include: {
      type: true,
      ...(include || {}),
    },
  });
  return Accessorys;
};

const findById = async (id: number) => {
  const Accessory = await prisma.accessory.findUnique({
    include: {
      type: true,
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });
  return Accessory;
};

const save = async (accessory: Accessory) => {
  if (accessory.id) {
    return await prisma.accessory.update({
      where: {
        id: accessory.id,
      },
      data: {
        name: accessory.name,
        sku: accessory.sku,
        price: accessory.price,
        stock_quantity: accessory.stock_quantity,
        thumbnail_image: accessory.thumbnail_image,
        description_image: accessory.description_image,
        origin: accessory.origin,
        description: accessory.description,
        type: {
          connect: {
            id: accessory.type_id,
          },
        },
        state: accessory.state,
        deleted_at: accessory.deleted_at,
      },
      include: {
        type: true,
      },
    });
  }
  return await prisma.accessory.create({
    data: {
      name: accessory.name,
      sku: accessory.sku,
      price: accessory.price,
      stock_quantity: accessory.stock_quantity,
      thumbnail_image: accessory.thumbnail_image,
      description_image: accessory.description_image,
      origin: accessory.origin,
      description: accessory.description,
      type: {
        connect: {
          id: accessory.type_id,
        },
      },
      state: accessory.state,
    },
  });
};

export default {
  findAll,
  findById,
  save,
};
