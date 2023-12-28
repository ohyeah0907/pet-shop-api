import bcrypt from "bcrypt";
import prisma from "../src/prisma";
import { petTypes, pets } from "../src/constants/data";
import userService from "../src/services/UserService";
import petService from "../src/services/PetService";

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
  // Create pet type
  await prisma.petType.createMany({ data: petTypes });

  // Create pet
  const createPropertiesPet = await petService.createPetPropertiesToRecombee({
    name: "string",
    type: "string",
  });
  console.log("createPropertiesPet.message :>> ", createPropertiesPet.message);

  for (let i = 0; i < pets.length; i++) {
    const pet = await prisma.pet.create({ data: pets[i] });
    if (createPropertiesPet.success) {
      await petService.createPetToRecombee(pet);
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
