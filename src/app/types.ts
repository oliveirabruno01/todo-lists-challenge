export interface TaskState {
    id: number
    title: string
    description: string
    indicator: 'dot' | 'circle' | 'sharp'
    open: boolean,
    index: number
}

export interface TasklistsState {
    todo: Array<TaskState>
    progress: Array<TaskState>
    done: Array<TaskState>
}