export type CameraBrandCreate = {
    name: string,
    preset_pattern: string,
    url_pattern: string,
}

export type CameraBrandUpdate = {
    id: number,
    name?: string,
    preset_pattern?: string,
    url_pattern?: string,
}