import { createContext, ReactElement, useMemo, useState } from "react";
import useSessionStorage from "../hooks/useSessionStorage";
import { Task, User } from "../types/custom";

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
    saveTasks: (newTasks: Task[]) => void 
  }
}

export const VeterinarianContext = createContext<ContextProps['defaultContext'] | null>(null);

export default function VeterinarianProvider({children}:ContextProps['props']) {
  const [veterinarian, setVeterinarian] = useSessionStorage({}, 'veterinarian');
  const [isAuth, setIsAuth] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAuth = (value: boolean) => {
    setIsAuth(value);
  }

  const saveTasks = (newValue: Task[]) => {
    setTasks(newValue);
  }

  const values = useMemo(() =>({
    veterinarian: (veterinarian as ContextProps['defaultContext']['veterinarian']),
    setVeterinarian,
    isAuth,
    handleAuth,
    tasks,
    saveTasks
  }), [veterinarian, setVeterinarian, isAuth, tasks])
  return (
    <VeterinarianContext.Provider value={values}>
      {children}
    </VeterinarianContext.Provider>
  )
}