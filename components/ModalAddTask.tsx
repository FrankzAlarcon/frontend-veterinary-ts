import { Dialog, Transition } from '@headlessui/react';
import { ChangeEvent, Fragment, useState } from 'react';
import useVeterinarian from '../hooks/useVeterinarian';
import { Message } from '../types/custom';
import Alert from './Alert';

interface Props {
  openModal: {operation: 'add' | 'delete' | 'edit', value: boolean},
  setOpenModal: (value: {operation: 'add' | 'delete' | 'edit', value: boolean}) => void
}

export default function ModalAddtask({openModal, setOpenModal}:Props) {
  const [priority, setPriority] = useState<'HIGH'|'MEDIUM'|'LOW' | ''>('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState<Message>({text: '', type: 'error'});
  const {addTask} = useVeterinarian();

  const handleAddTask = () => {
    if(!text) {
      setMessage({text: 'Aún no has escrito la tarea', type: 'error'})
      return;
    }
    let priorityText = priority;
    if(!priorityText) {
      priorityText = 'MEDIUM'
    }
    addTask({text, priority: priorityText});
    closeModal();
  }

  const handleSelect = (evt: ChangeEvent<HTMLSelectElement>) => {
    const value = evt.target.value;
    if(value === 'HIGH' || value === 'MEDIUM' || value === 'LOW') {
      setPriority(value)
    }
    if(value === '') {
      setPriority('MEDIUM')
    }
  }

  function closeModal() {
    const newValue = {operation: openModal.operation, value: false}
    setOpenModal(newValue);
    setPriority('');
    setText('');
    setMessage({text: '', type: 'successful'});
  }

  return (
      <Transition appear show={openModal.value && openModal.operation === 'add'} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-black text-center"
                  >
                    Escribe tu tarea
                  </Dialog.Title>
                  <div className="mt-2 space-y-5">
                    <label htmlFor="priorities" className='block'>
                      <select id="priorities" value={priority} onChange={handleSelect} className='w-full p-2 border-2 rounded-sm border-gray-700'>
                        <option value="" disabled>--Prioridad--</option>
                        <option value="HIGH">Alta</option>
                        <option value="MEDIUM">Media</option>
                        <option value="LOW">Baja</option>
                      </select>
                    </label>
                    <label htmlFor="content" className='block'>
                      <textarea id="content" value={text} onChange={(e) => setText(e.target.value)} className='w-full min-h-[100px] border-2 border-gray-900 rounded-md p-2'/>
                    </label>
                  </div>
                  {message.text && <Alert modal={true}>{message.text}</Alert>}
                  <div className={`flex ${message.text ? 'pt-10': ''} justify-evenly gap-5`}>
                    <button
                      type="button"
                      className="submit-button bg-indigo-600 hover:bg-indigo-700 text-white rounded-md"
                      onClick={handleAddTask}
                    >
                      Añadir
                    </button>
                    <button
                      type="button"
                      className="submit-button bg-gray-500 hover:bg-gray-700 text-white rounded-md"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
  )
}
