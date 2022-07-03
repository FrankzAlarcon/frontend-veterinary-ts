export interface Task {
  id: number,
  text: string,
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
}
interface ErrorResponse {
  error: string, 
  statusCode: boolean,
  message: string
}
export interface TasksResponse {
  error: ErrorResponse | '',
  body: Task[]
}

export interface CreateTaskResponse {
  error: ErrorResponse | '',
  body: Task
}

export type HandleModal = {
  operation: 'add' | 'delete' | 'edit',
  value: boolean
}

export interface DeleteTaskResponse {
  error: ErrorResponse | '',
  body: string
}