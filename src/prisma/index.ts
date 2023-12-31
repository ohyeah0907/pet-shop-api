import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    log: [
        { level: 'warn', emit: 'event' },
        { level: 'info', emit: 'event' },
        { level: 'error', emit: 'event' },
    ],
    errorFormat: "minimal",
});

export default prisma;