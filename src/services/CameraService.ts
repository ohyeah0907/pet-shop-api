import CameraRepository from "../repositories/CameraRepository"
import homeService from "./HomeService"
import userService from "./UserService"
import { CameraCreate, CameraUpdate } from "../dto/camera";
import cameraBrandService from "./CameraBrandService"
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return CameraRepository.findAll();
    },
    getById: async (id: number) => {
        const camera = await CameraRepository.findById(id);
        if (!camera) throw new Error("Không tìm thấy camera");
        return camera;
    },
    create: async (create: CameraCreate) => {
        const home = await homeService.getHomeById(create.home.id);
        const cameraBrand = await cameraBrandService.getById(create.camera_brand.id);
        const camera: any = {
            id: 0,
            home_id: home.id,
            name: create.name,
            camera_brand_id: cameraBrand.id,
            username: create.username,
            password: create.password,
            lan_ip: create.lan_ip,
            lan_port: create.lan_port,
            lan_uri: create.lan_uri,
            wan_ip: create.wan_ip,
            wan_port: create.wan_port,
            wan_uri: create.wan_uri,
            cloud_domain: create.cloud_domain,
            cloud_port: create.cloud_port,
            cloud_uri: create.cloud_uri,
        }
        return await CameraRepository.save(camera);
    },
    update: async (update: CameraUpdate) => {
        const camera: any = await service.getById(update.id);

        if (update.name) {
            camera.name = update.name;
        }
        if (update.home) {
            const home = await homeService.getHomeById(update.home.id);
            camera.home_id = home.id;
        }
        if (update.camera_brand) {
            const cameraBrand = await cameraBrandService.getById(update.camera_brand.id);
            camera.camera_brand_id = cameraBrand.id;
        }
        if (update.username) {
            camera.username = update.username;
        }
        if (update.password) {
            camera.password = update.password;
        }
        if (update.lan_ip) {
            camera.lan_ip = update.lan_ip;
        }
        if (update.lan_port) {
            camera.lan_port = update.lan_port;
        }
        if (update.lan_uri) {
            camera.lan_uri = update.lan_uri;
        }
        if (update.wan_ip) {
            camera.wan_ip = update.wan_ip;
        }
        if (update.wan_port) {
            camera.wan_port = update.wan_port;
        }
        if (update.wan_uri) {
            camera.wan_uri = update.wan_uri;
        }
        if (update.cloud_domain) {
            camera.cloud_domain = update.cloud_domain;
        }
        if (update.cloud_port) {
            camera.cloud_port = update.cloud_port;
        }
        if (update.cloud_uri) {
            camera.cloud_uri = update.cloud_uri;
        }
        return await CameraRepository.save(camera);
    },
    delete: async (id: number) => {
        const camera: any = await service.getById(id);
        camera.state = ObjectState.DELETED;
        camera.deleted_at = new Date();
        return !!(await CameraRepository.save(camera));
    }
}

export default service;