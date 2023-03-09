import axios, { AxiosResponse } from 'axios'
import { ITask } from './../interfaces/ITask'

const API = 'https://spring-api-todo-application-production.up.railway.app/api/tasks'

export const bringTasks = async (): Promise<ITask[]> => {
    const res = await axios.get<ITask[]>(API)
    return res.data
}

export const bringTask = async (id: string | undefined): Promise<ITask> => {
    const res = await axios.get<ITask>(`${API}/${id}`)
    return res.data
}

export const saveTask = async (task: ITask): Promise<AxiosResponse<ITask>> => {
    return await axios.post<ITask>(API, task)
}

export const updateTask = async (id: number, task: ITask): Promise<AxiosResponse<ITask>> => {
    return await axios.patch<ITask>(`${API}/${id}`, task)
}

export const deleteTask = async (id: number): Promise<AxiosResponse<ITask>> => {
    return await axios.delete<ITask>(`${API}/${id}`)
}