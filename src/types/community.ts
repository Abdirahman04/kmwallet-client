export interface CommunityMessage {
    id: number,
    message: string,
    customerId: string,
    timestamp: string
}

export interface SendMessage {
    message: string,
    timestamp: string,
    customerId: string
}