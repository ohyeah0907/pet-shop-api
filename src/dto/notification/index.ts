export type NotificationCreate= {
    name: string,
    content: string,
    deep_link: string,
}

export type NotificationUpdate= {
    id: number,
    name?: string,
    content?: string,
    deep_link?: string,
}