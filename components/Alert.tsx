interface Props {
  type?: 'error' | 'successful',
  children: string
}
function Alert({type, children}: Props) {
  let bgColor;
  if(type === 'error') {
    bgColor = 'bg-red-600'
  } else if(type === 'successful') {
    bgColor = 'bg-green-500'
  } else {
    bgColor = 'bg-yellow-400'
  }
  return (
    <p className={`w-full text-center p-2 mt-2 font-bold uppercase text-white ${bgColor}`}>{children}</p>
  )
}

export default Alert