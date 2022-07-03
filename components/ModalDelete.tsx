import { Dialog, Transition, } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Message } from '../types/custom';
import Alert from './Alert';

interface Props {
  openModal: {operation: 'add' | 'delete' | 'edit', value: boolean},
  setOpenModal: (value: {operation: 'add' | 'delete' | 'edit', value: boolean}) => void
  title: string,
  handleDelete: () => Promise<string>
}

export default function ModalDelete({openModal, setOpenModal, title, handleDelete}:Props) {
  const [message, setMessage] = useState<Message>({text: '', type: 'error'});

  const handleDeleteTask = async () => {
    const msg = await handleDelete();
    setMessage({type:'successful', text: msg})
    setTimeout(() => {
      closeModal();
    }, 500);
  }

  function closeModal() {    
    setOpenModal({operation: 'delete', value: false});    
    setMessage({text: '', type: 'successful'});    
  }

  return (
      <Transition appear show={openModal.value && openModal.operation === 'delete'} as={Fragment}>
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
                  <div className='w-fit mx-auto'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="rgb(251, 146, 60)" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-black text-center"
                  >
                    {title}
                  </Dialog.Title>
                  <p className='text-center my-2 text-sm'>No podrás recuperarla!!</p>      
                  {message.text && <Alert modal={true}>{message.text}</Alert>}            
                  <div className={`flex ${message.text ? 'pt-10': ''} justify-evenly gap-5`}>
                    <button
                      type="button"
                      className="submit-button bg-red-600 hover:bg-red-700 text-white rounded-md"
                      onClick={handleDeleteTask}
                    >
                      Eliminar
                    </button>
                    <button
                      type="button"
                      className="submit-button bg-blue-500 hover:bg-blue-700 text-white rounded-md"
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
