import ActionableRepository from "../repositories/ActionableRepository"
import { ActionableCreate, ActionableDto, ActionableUpdate } from "../dto/actionable";
import roomService from "./RoomService";
import filterService from "./FilterService";
import scriptService from "./ScriptService";
import deviceService from "./DeviceService";
import sensorService from "./SensorService";
import automationService from "./AutomationService";
import { ObjectState } from "@prisma/client";

const service = {
    search: async (params: any) => {
        const actionables = await ActionableRepository.findAll();
        const actionablesDto: ActionableDto[] = [];
        for (const actionable of actionables) {
            const actionableDto: ActionableDto = {
                id: actionable.id,
                name: actionable.name,
                room: actionable.room,
                ordering: actionable.ordering,
                type: actionable.type,
                state: actionable.state,
                created_at: actionable.created_at,
                updated_at: actionable.updated_at,
                deleted_at: actionable.deleted_at,
                data: null,
            }
            switch (actionable.type) {
                case "Filter": {
                    const filter = await filterService.getById(actionable.type_id);
                    actionableDto.data = filter;
                    break;
                }
                case "Script": {
                    const script = await scriptService.getById(actionable.type_id);
                    actionableDto.data = script;
                    break;
                }
                case "Automation": {
                    const automation = await automationService.getById(actionable.type_id);
                    actionableDto.data = automation;
                    break;
                }
                case "Device": {
                    const device = await deviceService.getById(actionable.type_id);
                    actionableDto.data = device;
                    break;
                }
                case "Sensor": {
                    const sensor = await sensorService.getById(actionable.type_id);
                    actionableDto.data = sensor;
                    break;
                }
                default: {
                    break;
                }
            }
            actionablesDto.push(actionableDto);
        }
        return actionablesDto;
    },
    getById: async (id: number) => {
        const actionable = await ActionableRepository.findById(id);
        if (!actionable) throw new Error("Không tìm thấy actionable");
        const actionableDto: ActionableDto = {
            id: actionable.id,
            name: actionable.name,
            room: actionable.room,
            ordering: actionable.ordering,
            type: actionable.type,
            state: actionable.state,
            created_at: actionable.created_at,
            updated_at: actionable.updated_at,
            deleted_at: actionable.deleted_at,
            data: null,
        }
        switch (actionable.type) {
            case "Filter": {
                const filter = await filterService.getById(actionable.type_id);
                actionableDto.data = filter;
                break;
            }
            case "Script": {
                const script = await scriptService.getById(actionable.type_id);
                actionableDto.data = script;
                break;
            }
            case "Automation": {
                const automation = await automationService.getById(actionable.type_id);
                actionableDto.data = automation;
                break;
            }
            case "Device": {
                const device = await deviceService.getById(actionable.type_id);
                actionableDto.data = device;
                break;
            }
            case "Sensor": {
                const sensor = await sensorService.getById(actionable.type_id);
                actionableDto.data = sensor;
                break;
            }
            default: {
                break;
            }
        }
        return actionableDto;
    },
    create: async (create: ActionableCreate) => {
        const room = await roomService.getById(create.room.id);
        const actionable: any = {
            id: 0,
            room_id: room.id,
            name: create.name,
            ordering: create.ordering,
            type: create.type,
            type_id: create.type_id,
        }
        return await ActionableRepository.save(actionable);
    },
    update: async (update: ActionableUpdate) => {
        const actionable: any = await service.getById(update.id);
        if (update.room) {
            const room = await roomService.getById(update.room.id);
            actionable.room_id = room.id;
        }
        if (update.ordering) {
            actionable.ordering = update.ordering;
        }
        if (update.name) {
            actionable.name = update.name;
        }
        if (update.type) {
            actionable.type = update.type;
        }
        if (update.type_id) {
            actionable.type_id = update.type_id;
        }
        return await ActionableRepository.save(actionable);
    },
    delete: async (id: number) => {
        const actionable: any = await service.getById(id);
        actionable.state = ObjectState.DELETED;
        actionable.deleted_at = new Date();
        return !!(await ActionableRepository.save(actionable));
    }
}

export default service;