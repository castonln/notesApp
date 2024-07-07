// What we receive from backend (JSON)
export interface Note {
    _id: string,
    title: string,
    text?: string,
    createdAt: string,
    updatedAt: string,
};