import { createContext, ReactElement, useCallback, useMemo, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { createTask, deleteTaskFnc, updateTask } from "../services/task";
import { User } from "../types/custom";
import { Task } from "../types/task";

export interface ContextProps {
  props: {
    children?: JSX.Element[] | ReactElement
  },
  defaultContext: {
    veterinarian: User | {},
    setVeterinarian: (value: unknown) => void,
    isAuth: boolean,
    handleAuth: (value: boolean) => void,
    tasks: Task[],
    saveTasks: (newTasks: Task[]) => void,
    loading: boolean,
    selectedTask: Task,
    handleSelectedTask: (value: Task) => void
    addTask: (newTask: Omit<Task, 'id'>) => Promise<void>
    editTask: (newTask: Task) => Promise<void>
    deleteTask: (task: Task) => Promise<void>
  }
}

export const VeterinarianContext = createContext<ContextProps['defaultContext'] | null>(null);

export default function VeterinarianProvider({children}:ContextProps['props']) {
  const [veterinarian, setVeterinarian, loading] = useSessionStorage({}, 'veterinarian');
  const [isAuth, setIsAuth] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]); 
  const [selectedTask, setSelectedTask] = useState<Task>({id: 0, priority: 'MEDIUM', text: ''})
  const [error, setError] = useState(''); 

  const handleAuth = (value: boolean) => {
    setIsAuth(value);
  }

  const saveTasks = (newValue: Task[]) => {
    setTasks(newValue);
  }

  const addTask = useCallback(async (task: Omit<Task, 'id'>) => {
    try {
      const vet = veterinarian as User;
      const newTask = await createTask(vet.id, vet.token, task);
      const newTasks = [...tasks, newTask];
      setTasks(newTasks);
    } catch (error) {
      setError((error as Error).message);
    }
  }, [tasks, veterinarian]);

  const handleSelectedTask = (task: Task) => {
    setSelectedTask(task);
  }

  const editTask = useCallback(async (task: Task) => {
    try {
      const vet = veterinarian as User;
      const newTask = await updateTask(vet.id, vet.token, task);
      const newTasks = tasks.map(item => item.id === task.id ? newTask : item);
      setTasks(newTasks);
    } catch (error) {
      setError((error as Error).message);
    }
  }, [tasks, veterinarian])

  const deleteTask = useCallback(async (task: Task) => {
    try {
      const vet = veterinarian as User;
      await deleteTaskFnc(vet.id, vet.token, task.id);
      const newTasks = tasks.filter(item => item.id !== task.id);
      setTasks(newTasks);
    } catch (error) {
      setError((error as Error).message);
    }
  }, [tasks, veterinarian]);

  const values = useMemo(() =>({
    veterinarian: (veterinarian as ContextProps['defaultContext']['veterinarian']),
    setVeterinarian,
    isAuth,
    handleAuth,
    tasks,
    saveTasks,
    loading,
    addTask,
    deleteTask,
    selectedTask,
    handleSelectedTask,
    editTask
  }), [veterinarian, setVeterinarian, isAuth, tasks, loading, addTask, deleteTask, selectedTask, editTask])
  return (
    <VeterinarianContext.Provider value={values}>
      {children}
    </VeterinarianContext.Provider>
  )
}