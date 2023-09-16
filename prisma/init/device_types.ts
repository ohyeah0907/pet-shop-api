import { DeviceType, DeviceTypeCode, ObjectState } from "@prisma/client";

export const device_types = [
    {
        code: DeviceTypeCode.alarm_control_panel,
        name: 'Báo thức',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.binary_sensor,
        name: 'Báo thức',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.button,
        name: 'Nút',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.camera,
        name: 'Camera',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.climate,
        name: 'Khí hậu',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.cover,
        name: 'Rèm',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.fan,
        name: 'Quạt',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.group,
        name: 'Nhóm',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.humidifier,
        name: 'Độ ẩm',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.input_boolean,
        name: 'Bật/Tắt',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.input_button,
        name: 'Nút',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.input_select,
        name: 'Chọn',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.light,
        name: 'Đèn',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.lock,
        name: 'Khoá',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.media_player,
        name: 'Trình phát',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.scene,
        name: 'Tự động',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.script,
        name: 'Kịch bản',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.select,
        name: 'Chọn',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.sensor,
        name: 'Cảm biến',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.switch,
        name: 'Công tắc',
        state: ObjectState.ACTIVE
    },
    {
        code: DeviceTypeCode.vacuum,
        name: 'Máy hút bụi',
        state: ObjectState.ACTIVE
    },
]