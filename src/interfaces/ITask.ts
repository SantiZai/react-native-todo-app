export enum LEVELS {
    INFO,
    WARNING,
    URGENT
}

export interface ITask {
    id: number
    title: string
    description: string
    completed: boolean
    level: LEVELS
}