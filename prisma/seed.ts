import { DeviceType, PrismaClient } from "@prisma/client";
import { device_types } from "./init/device_types"
import prisma from "../src/prisma"

const main = async () => {
    device_types.forEach(async (device_type: any) => {
        const datas = await prisma.deviceType.create({
            data: device_type
        })
        console.log(datas)
    })
}

main().catch(e =>{
    console.log(e)
    process.exit(1)
}).finally(() => {
    prisma.$disconnect();
})