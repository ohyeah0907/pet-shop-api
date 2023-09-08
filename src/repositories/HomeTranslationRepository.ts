import { HomeTranslationSearch } from "../dto/home";
import prisma from "../prisma"
import { HomeTranslation, ObjectState } from "@prisma/client";


const findAll = async (search: HomeTranslationSearch) => {
    const condition: any = {
        NOT: {
            state: ObjectState.DELETED
        }
    }
    if (search.language) {
        condition.language_id = search.language.id;
    }

    if (search.home) {
        condition.home_id = search.home.id;
    }
    const homeTranslations = await prisma.homeTranslation.findMany({
        include: {
            home: true,
            language: true,
        },
        where: condition,
    });
    return homeTranslations;
}

const findById = async (id: number) => {
    const homeTranslation = await prisma.homeTranslation.findUnique({
        include: {
            home: true,
            language: true,
        },
        where: {
            id: id,
            NOT: {
                state: ObjectState.DELETED
            }
        }
    });
    return homeTranslation;
}

const save = async (homeTranslation: HomeTranslation) => {

    if (homeTranslation.id) {
        return await prisma.homeTranslation.update({
            where: {
                id: homeTranslation.id
            },
            data: {
                name: homeTranslation.name,
                language: {
                    connect: {
                        id: homeTranslation.language_id
                    }
                },
                address: homeTranslation.address,
                home: {
                    connect: {
                        id: homeTranslation.home_id
                    }
                },
                state: homeTranslation.state,
                deleted_at: homeTranslation.deleted_at,
                updated_at: homeTranslation.updated_at,
            },
        });
    }
    return await prisma.homeTranslation.create({
        data: {
            name: homeTranslation.name,
            language: {
                connect: {
                    id: homeTranslation.language_id
                }
            },
            address: homeTranslation.address,
            home: {
                connect: {
                    id: homeTranslation.home_id
                }
            },

        },
    });

}

export default {
    findAll,
    findById,
    save
}