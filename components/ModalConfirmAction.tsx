import { Dialog, Transition, } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

interface Props {
  showModal: boolean
  handleModal: (value: boolean) => void
  title: string
  nextRoute?: string
}

export default function ModalConfirmAction({showModal, handleModal, title, nextRoute}:Props) {
  const router = useRouter();
  function closeModal() {    
    handleModal(false);
    if(nextRoute) {
      router.push(nextRoute);
    }
  }

  return (
      <Transition appear show={showModal} as={Fragment}>
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20" fill="none" viewBox="0 0 24 24" stroke="rgb(163, 230, 53)" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-bold leading-6 text-black text-center"
                  >
                    {title}
                  </Dialog.Title>
                  <p className='text-center my-2 text-sm'>Presiona el botón para ir a detalles</p>      
                  <div className={`flex justify-evenly gap-5`}>
                    <button
                      type="button"
                      className="submit-button bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                      onClick={closeModal}
                    >
                      Ir a detalles
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
