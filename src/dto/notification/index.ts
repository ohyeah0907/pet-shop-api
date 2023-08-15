export type NotificationCreate= {
    name: string,
    content: string,
    deep_link: string,
    data: string,
    has_media: boolean,
}

export type NotificationUpdate= {
    id: number,
    name?: string,
    content?: string,
    deep_link?: string,
    data?: string,
    has_media?: boolean,
}