import { GetResult } from "@prisma/client/runtime/library";
import prisma from "../prisma"
import { Language, ObjectState } from "@prisma/client";


const findAll = async () => {
    const languages = await prisma.language.findMany({
        where: {
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return languages;
}

const findById = async (id: number) => {
    const language = await prisma.language.findUnique({
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return language;
}

const save = async (language: Language) => {

    if (language.id) {
        return await prisma.language.update({
            where: {
                id: language.id
            },
            data: {
                name: language.name,
                code: language.code,
                state: language.state,
                deleted_at: language.deleted_at,
                updated_at: language.updated_at,
            },
        });
    }
    return await prisma.language.create({
        data: {
            name: language.name,
            code: language.code,
        },
    });

}

export default {
    findAll,
    findById,
    save
}