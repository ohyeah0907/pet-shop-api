import { AccessorySearch } from "../dto/accessory";
import prisma from "../prisma";
import { Accessory, ObjectState } from "@prisma/client";

const findAll = async (search: AccessorySearch, include?: object) => {
  const condition: any = {};

  if ("name" in search) {
    condition.name = search.name
      ? { contains: `${search.name}`, mode: "insensitive" }
      : "";
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
  if (search?.inSkus && Array.isArray(search.inSkus)) {
    condition.sku = {
      in: search.inSkus,
    };
  }

  const accessories = await prisma.accessory.findMany({
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
  return accessories;
};

const findById = async (id: number, include?: object) => {
  const accessory = await prisma.accessory.findUnique({
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
        weight: accessory.weight,
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
      weight: accessory.weight,
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
