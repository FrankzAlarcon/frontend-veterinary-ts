import { useState } from "react"
import useVeterinarian from "../hooks/useVeterinarian"
import { updateCustomer } from "../services/customer"
import { User } from "../types/custom"
import { Customer } from "../types/customer"


interface Props {
  props: {
    customerData: Customer
    setCustomerData: (value: Customer) => void
    handleShowForm: (value: boolean) => void
  }
}

export default function EditCustomerData({customerData, handleShowForm, setCustomerData}: Props['props']) {
  const [name, setName] = useState(customerData.name);
  const [email, setEmail] = useState(customerData.email);
  const {veterinarian} = useVeterinarian();

  const handleSubmit = async () => {
    if(name === customerData.name && email === customerData.email) {
      handleShowForm(false);
      return;
    }
    try {
      const newCustomerData: Omit<Customer, 'id'> = {
        name: name.trim(),
        email: email.trim(),
      }
      await updateCustomer(customerData.id, newCustomerData, (veterinarian as User).token);
      setCustomerData({...customerData, ...newCustomerData});
      handleShowForm(false);
    } catch (error) {
      
    }
  }

  return (
    <div className='space-y-3 mb-2 md:flex md:flex-row-reverse justify-between items-center md:space-y-0 md:gap-x-10'>
      <div className="flex gap-4 md:flex-col md:gap-1 lg:w-2/12">
        <button
          className='submit-button no-margin bg-lime-500 hover:bg-lime-400 text-white md:w-full'
          onClick={handleSubmit}
        >Guardar</button>
        <button
          className='submit-button no-margin bg-red-600 hover:bg-red-700 text-white md:w-full'
          onClick={() => handleShowForm(false)}
        >Cancelar</button>
      </div>
      <div className='space-y-1 md:w-10/12'>        
        <div className='flex gap-2 items-center'>
          <label className='text-gray-600 font-bold uppercase'>Cliente: </label>
          <input
            className='w-full p-2 border-2 border-gray-300 rounded-md'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex gap-2 items-center'>
          <label className='text-gray-600 font-bold uppercase'>Email</label>
          <input
            className='w-full p-2 border-2 border-gray-300 rounded-md'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
