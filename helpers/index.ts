import { Task } from "../types/task";

export const priorityTraduction = (priority: 'HIGH' | 'MEDIUM' | 'LOW' | ''): string => {
  if(priority === 'HIGH') {
    return 'Alta';
  } else if (priority === 'MEDIUM') {
    return 'Media';
  } else if (priority === 'LOW'){
    return 'Baja';
  }
  return priority;
}

export const formatDate = (date: string): string => {
  const newDate = new Date(date).toISOString().split('.')[0].slice(0,-3)
  return newDate
}

export const formatStringToDate = (date: string) => {
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}

export const formatMoney = (money: number): string => {
  return money.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const filterTasksByPriority = (tasks: Task[], priority: 'HIGH' | 'MEDIUM' | 'LOW' | ''): Task[] => {
  return tasks.filter(task => {    
    if(priority === '') {
      return task;
    }
    if(priority === task.priority) {
      return task;
    }
  });
}

export const filterTasksByText = (tasks: Task[], text: string): Task[] => {
  return tasks.filter(task => task.text.toLowerCase().includes(text.toLowerCase()));
}