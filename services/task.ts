import { envVariables } from ".";
import { CreateTaskResponse, DeleteTaskResponse, Task, TasksResponse } from "../types/task";

export const getAllTasks = async (id: number, token: string) => {
  const rawData = await fetch(`${envVariables.apiUrl}/veterinarians/${id}/tasks`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
  const {error, body}: TasksResponse = await rawData.json();
  if (error) {
    throw new Error(error.message);
  }  
  return body;
}

export const createTask = async (veterinarianId: number, token: string, task: Omit<Task, 'id'>) => {
  const rawData = await fetch(`${envVariables.apiUrl}/veterinarians/${veterinarianId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {body, error}:CreateTaskResponse = await rawData.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}

export const deleteTaskFnc =  async (veterinarianId: number, token: string, taskId: number) => {
  const rawData = await fetch(`${envVariables.apiUrl}/veterinarians/${veterinarianId}/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`
    }
  });
  const {body, error}: DeleteTaskResponse = await rawData.json();
  if(error) {
    throw new Error(error.message);
  }
  return body;
}