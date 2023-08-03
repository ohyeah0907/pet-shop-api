import RoomCameraRepository from "../repositories/RoomCameraRepository"
import { RoomCameraCreate, RoomCameraUpdate } from "../dto/room_camera";
import roomService from "./RoomService";
import cameraService from "./CameraService";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        return RoomCameraRepository.findAll();
    },
    getById: async (id: number) => {
        const roomCamera = await RoomCameraRepository.findById(id);
        if (!roomCamera) throw new Error("Không tìm thấy roomCamera");
        return roomCamera;
    },
    create: async (create: RoomCameraCreate) => {
        const room = await roomService.getById(create.room.id);
        const camera = await cameraService.getById(create.camera.id);
        const roomCamera: any = {
            id: 0,
            room_id: room.id,
            camera_id: camera.id,
            ordering: create.ordering,
            pinned: create.pinned,
        }
        return await RoomCameraRepository.save(roomCamera);
    },
    update: async (update: RoomCameraUpdate) => {
        const roomCamera: any = await service.getById(update.id);
        if (update.camera) {
            const camera = await cameraService.getById(update.camera.id);
            roomCamera.camera_id = camera.id;
        }
        if (update.room) {
            const room = await roomService.getById(update.room.id);
            roomCamera.room_id = room.id;
        }
        if (update.ordering) {
            roomCamera.ordering = update.ordering;
        }
        if (update.pinned != null) {
            roomCamera.pinned = update.pinned;
        }
        return await RoomCameraRepository.save(roomCamera);
    },
    delete: async (id: number) => {
        const roomCamera: any = await service.getById(id);
        roomCamera.state = ObjectState.DELETED;
        roomCamera.deleted_at = new Date();
        return !!(await RoomCameraRepository.save(roomCamera));
    }
}

export default service;