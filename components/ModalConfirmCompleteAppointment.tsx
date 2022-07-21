import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface Props {
  openModal: boolean,
  setOpenModal: (value: boolean) => void
  title: string,
  text: string | string[],
  handleComplete: () => Promise<void>
}

export default function ModalConfirmCompleteAppointment({title, text, openModal, setOpenModal, handleComplete}: Props) {
  const closeModal = () => {
    setOpenModal(false);
  }
  return (
    <Transition appear show={openModal} as={Fragment}>
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
                  <p className='text-center mt-2'><span className='font-bold'>Receta:</span> {text[0]}</p>                      
                  <p className='text-center mb-2'><span className='font-bold'>Precio:</span> {text[1]}</p>                      
                  <div className={`flex justify-evenly gap-5`}>
                    <button
                      type="button"
                      className="submit-button bg-blue-500 hover:bg-blue-700 text-white rounded-md"
                      onClick={handleComplete}
                    >
                      Sí, guardar
                    </button>
                    <button
                      type="button"
                      className="submit-button bg-red-600 hover:bg-red-700 text-white rounded-md"
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
