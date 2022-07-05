interface Props {
  type?: 'purple'
}

function Spinner({type}: Props) {
  return (
    <div className={`spinner ${type}`}>
      <div className="bounce1"></div>
      <div className="bounce2"></div>
      <div className="bounce3"></div>
    </div>
  )
}

export default Spinner