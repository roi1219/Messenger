import { User } from "./user";

export interface Comment {
    id: number,
    parentCommentId: number | null,
    ownerId: number,
    txt: string,
    createdAt: string,
    deletedAt: any
}
