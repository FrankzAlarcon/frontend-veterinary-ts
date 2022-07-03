import { GetServerSidePropsContext } from 'next';
import React, { useEffect, useState } from 'react'
import AddButton from '../components/AddButton';
import Input from '../components/Input';
import Layout from '../components/Layout'
import ModalAddtask from '../components/ModalAddTask';
import ModalDelete from '../components/ModalDelete';
import Task from '../components/Task'
import useVeterinarian from '../hooks/useVeterinarian';
import { getAllTasks } from '../services/task';
import { Message, User } from '../types/custom';
import { HandleModal, Task as ITask } from '../types/task';
interface Props {
  message: Message
  handleModal: HandleModal
}

export default function Tasks() {
  const [input, setInput] = useState('');
  const [openModal, setOpenModal] = useState<Props['handleModal']>({operation: 'add', value: false});
  const [taskItem, setTaskItem] = useState<ITask>({id: 0, priority: 'MEDIUM', text: ''})
  const [message, setMessage] = useState<Props['message']>({text: '', type: 'successful'});
  const {veterinarian, saveTasks, tasks, deleteTask} = useVeterinarian();

  useEffect(() => {
    const getTasks = async () => {
      try {
        if(Object.keys(veterinarian).length !== 0) {
          const vet: User = veterinarian as User;
          const tasksResponse: ITask[]= await getAllTasks(vet.id, vet.token);
          saveTasks(tasksResponse);             
        }
      } catch (error) {
        setMessage({type: 'error', text: (error as Error).message});
      }
    }
    getTasks();
  }, [saveTasks, veterinarian]);

  const handleShowModal = (newValue:HandleModal) => {  
    setOpenModal({...newValue, value: newValue.value});    
  }

  const handleDelete = async (): Promise<string> => {
    await deleteTask(taskItem);
    return 'Tarea eliminada correctamente';
  }

  return (
    <Layout title='Mis Tareas'>      
      <div className='p-2'>
        <h1 className='text-3xl md:text-4xl lg:text-5xl font-black text-center my-2'>Lista de <span className='text-indigo-600'>Tareas</span></h1>
        <p className='text-center mb-3'>Administra tus <span className='text-indigo-600 font-bold'>tareas y cosas por hacer</span></p>
        <div className='mt-2 mb-3 space-y-2'>
          <Input id='searcher' placeholder='Filtra tus tareas' value={input} setValue={setInput} />
          <label htmlFor="priority-filter" className='block'>
            <select defaultValue={''} name="priority-filter" id="priority-filter" 
            className='w-full p-2 border-2 border-gray-400 rounded-md md:w-3/5 mx-auto block'>
              <option value="">--Filtra por prioridad--</option>
              <option value="HIGH">Alta</option>
              <option value="MEDIUM">Media</option>
              <option value="LOW">Baja</option>
            </select>
          </label>
        </div>
        <div className='lg:grid lg:grid-cols-2 gap-10'>
          {tasks.map((task) => (<Task key={task.id} task={task} setTask={setTaskItem} handleShowModal={handleShowModal}/>))}
        </div>
        <div className='fixed right-0 bottom-0 m-6'>
          <AddButton onClick={handleShowModal}/>
        </div>
        <ModalAddtask openModal={openModal} setOpenModal={handleShowModal} />
        <ModalDelete
          openModal={openModal}
          handleDelete={handleDelete}
          setOpenModal={handleShowModal}
          title="¿Realmente quieres eliminar esta tarea?"
        />
      </div>
    </Layout>
  )
}
