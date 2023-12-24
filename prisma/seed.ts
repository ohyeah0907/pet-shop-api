import bcrypt from "bcrypt";
import prisma from "../src/prisma";
import { petTypes, pets } from "../src/constants/data";

const main = async () => {
  await prisma.user.createMany({
    data: [
      {
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
    ],
  } as any);

  await prisma.petType.createMany({ data: petTypes });
  await prisma.pet.createMany({ data: pets });
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
