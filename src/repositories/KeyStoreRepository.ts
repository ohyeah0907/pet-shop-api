import { KeyStore, User, ObjectState } from "@prisma/client";
import prisma from "../prisma";

async function findForKey(client: User, key: string) {
    const keystore = await prisma.keyStore.findFirst({
        where: {
            client_id: client.id,
            refresh_token: key,
        }
    });
    return keystore;
}

async function findByRefreshToken(refresh_token: string) {
    const keystore = await prisma.keyStore.findFirst({
        where: {
            refresh_token: refresh_token,
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
    refresh_token: string,
) {
    const keystore = await prisma.keyStore.findFirst({
        where: {
            client_id: client.id,
            refresh_token: refresh_token,
        }
    });
    return keystore;
}

async function create(
    client: User,
    refresh_token: string,
) {
    const keystore = await prisma.keyStore.create({
        data: {
            client: { connect: { id: client.id } },
            refresh_token: refresh_token,
        }
    });
    return keystore;
}

export default {
    findForKey,
    findByRefreshToken,
    remove,
    removeAllForClient,
    find,
    create,
};