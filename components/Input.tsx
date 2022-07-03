import React, { Dispatch, SetStateAction } from 'react'

interface Props {
  id: string,
  placeholder: string,
  value: string,
  setValue: Dispatch<SetStateAction<string>>
}

export default function Input({id, placeholder, setValue, value}: Props) {
  return (
    <label htmlFor={id}>
      <input
        className='w-full p-2 border-2 border-gray-400 rounded-md md:w-5/6 mx-auto block'
        id={id}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </label>
  )
}
