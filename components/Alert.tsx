interface Props {
  type?: 'error' | 'successful',
  children: string
  modal?: boolean
}
function Alert({type, children, modal}: Props) {
  let bgColor;
  if(type === 'error') {
    bgColor = 'bg-red-600'
  } else if(type === 'successful') {
    bgColor = 'bg-green-500'
  } else {
    bgColor = 'bg-yellow-400'
  }
  return (
    modal ? (
      <p className="bg-gray-200 w-full absolute left-0 p-2 text-center font-medium flex justify-center items-center gap-2 mt-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="rgb(249, 99, 99)">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {children}
      </p>
    ) : (
      <p className={`w-full text-center p-2 mt-2 font-bold uppercase text-white ${bgColor}`}>{children}</p>
    )
  )
}

export default Alert