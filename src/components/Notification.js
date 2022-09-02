import '../index.css'

const Notification = ({ notice }) =>
{
  if (notice.message === '') {
    return null
  }
  else
    return (
      notice.type===0? <div className='notify'>{notice.message}</div>: <div className='error'>{notice.message}</div>
    )
}

export default Notification