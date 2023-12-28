import bcrypt from "bcrypt";
import prisma from "../src/prisma";
import { petTypes, pets } from "../src/constants/data";
import userService from "../src/services/UserService";
import productService from "../src/services/ProductService";

const main = async () => {
  // Create admin user
  const user = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: bcrypt.hashSync("admin", 10),
      name: "admin",
      username: "admin",
      phone: "0123456789",
      address: "",
      verification_token: "123456",
      is_verified: true,
      is_locked: false,
      is_admin: true,
    },
  } as any);
  const createPropertiesUser = await userService.createUserPropertiesToRecombee(
    {
      email: "string",
      username: "string",
    },
  );
  console.log(
    "createPropertiesUser.message :>> ",
    createPropertiesUser.message,
  );

  if (createPropertiesUser.success) {
    await userService.createUserToRecombee(user);
  }

  // Create product properties to recommbee
  const createProductProperties =
    await productService.createProductPropertiesToRecombee({
      name: "string",
      type: "string",
      // thumbnail_image: "string",
    });
  console.log(
    "createProductProperties.message :>> ",
    createProductProperties.message,
  );

  // Create pet type
  await prisma.petType.createMany({ data: petTypes });

  // Create pet
  for (let i = 0; i < pets.length; i++) {
    const pet = await prisma.pet.create({ data: pets[i] });
    if (createProductProperties.success) {
      await productService.createProductToRecombee(pet, "pet");
    }
  }

  // Create accessory type
  await prisma.accessoryType.createMany({ data: [] });

  // Create accessory
  const accessories: any[] = [];
  for (let i = 0; i < accessories.length; i++) {
    const accessory = await prisma.accessory.create({ data: accessories[i] });
    if (createProductProperties.success) {
      await productService.createProductToRecombee(accessory, "accessory");
    }
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
