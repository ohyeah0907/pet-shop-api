import { KeyStore, User, ObjectState } from "@prisma/client";
import prisma from "../prisma";

async function findForKey(client: User, key: string) {
    const keystore = await prisma.keyStore.findFirst({
        where: {
            client_id: client.id,
            primary_key: key,
        }
    });
    return keystore;
}

async function remove(id: number) {
    return prisma.keyStore.delete({
        where: {
            id: id,
        }
    });
}

async function removeAllForClient(client: User) {
    return prisma.keyStore.deleteMany({
        where: {
            client_id: client.id,
        }
    });
}

async function find(
    client: User,
    primaryKey: string,
    secondaryKey: string,
) {
    const keystore = await prisma.keyStore.findFirst({
        where: {
            client_id: client.id,
            primary_key: primaryKey,
            secondary_key: secondaryKey,
        }
    });
    return keystore;
}

async function create(
    client: User,
    primaryKey: string,
    secondaryKey: string,
) {
    const keystore = await prisma.keyStore.create({
        data: {
            client: { connect: { id: client.id } },
            primary_key: primaryKey,
            secondary_key: secondaryKey,
        }
    });
    return keystore;
}

export default {
    findForKey,
    remove,
    removeAllForClient,
    find,
    create,
};