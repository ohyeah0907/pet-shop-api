import LanguageRepository from "../repositories/LanguageRepository"
import { LanguageCreate, LanguageUpdate } from "../dto/language";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return LanguageRepository.findAll();
    },
    getById: async (id: number) => {
        const language = await LanguageRepository.findById(id);
        if (!language) throw new Error("Không tìm thấy language");
        return language;
    },
    create: async (create: LanguageCreate) => {
        const language: any = {
            id: 0,
            name: create.name,
            code: create.code,
        }
        return await LanguageRepository.save(language);
    },
    update: async (update: LanguageUpdate) => {
        const language: any = await service.getById(update.id);

        if (update.name) language.name = update.name;

        if (update.code) language.code = update.code;

        return await LanguageRepository.save(language);
    },
    delete: async (id: number) => {
        const language: any = await service.getById(id);
        language.state = ObjectState.DELETED;
        language.deleted_at = new Date();
        return !!(await LanguageRepository.save(language));
    }
}

export default service;