import CloudRepository from "../repositories/CloudRepository"
import { CloudCreate, CloudUpdate } from "../dto/cloud";
import { ObjectState } from "@prisma/client";

const service = {
    getCloudSearch: async (params: any) => {
        return CloudRepository.findAll();
    },
    getCloudById: async (id: number) => {
        const cloud = await CloudRepository.findById(id);
        if (!cloud) throw new Error("Không tìm thấy cloud");
        return cloud;
    },
    createCloud: async (create: CloudCreate) => {
        const cloud: any = {
            id: 0,
            ip: create.ip,
            domain: create.domain,
        }
        return await CloudRepository.save(cloud);
    },
    updateCloud: async (update: CloudUpdate) => {
        const cloud: any = await service.getCloudById(update.id);

        if (update.ip) {
            cloud.ip = update.ip;
        }
        if (update.domain) {
            cloud.is_domainowner = update.domain;
        }
        return await CloudRepository.save(cloud);
    },
    deleteCloud: async (id: number) => {
        const cloud: any = await service.getCloudById(id);
        cloud.state = ObjectState.DELETED;
        cloud.deleted_at = new Date();
        return !!(await CloudRepository.save(cloud));
    }
}

export default service;