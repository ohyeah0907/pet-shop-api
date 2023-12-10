import { AccessorySearch } from "../dto/accessory";
import prisma from "../prisma";
import { Accessory, ObjectState } from "@prisma/client";

const findAll = async (search?: AccessorySearch, include?: object) => {
  const condition: any = {};

  if (search?.name) {
    condition.name = {
      contains: search.name,
    };
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

  const accessories = await prisma.accessory.findMany({
    where: {
      state: ObjectState.ACTIVE,
      ...condition,
    },
    include: {
      type: true,
      ...(include || {}),
    },
  });
  return accessories;
};

const findById = async (id: number, include?: object) => {
  const accessory = await prisma.accessory.findUnique({
    include: {
      type: true,
      ...(include || {}),
    },
    where: {
      id: id,
      state: ObjectState.ACTIVE,
    },
  });
  return accessory;
};

const save = async (accessory: Accessory, include?: object) => {
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
        description_images: accessory.description_images,
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
        ...(include || {}),
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
      description_images: accessory.description_images,
      origin: accessory.origin,
      description: accessory.description,
      type: {
        connect: {
          id: accessory.type_id,
        },
      },
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
