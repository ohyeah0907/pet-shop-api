import bcrypt from "bcrypt";
import prisma from "../src/prisma";

const main = async () => {
  const user = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: bcrypt.hashSync("admin", 10),
      name: "admin",
      username: "admin",
      phone: "0123456789",
      verification_token: "123456",
      is_verified: true,
      is_locked: false,
      is_admin: true,
    },
  } as any);
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
