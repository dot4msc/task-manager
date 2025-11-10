import './DeleteButton.css'

export default function DeleteButton({onDelete}) {
  return(
    <button onClick={onDelete} className='delete-button'>X</button>
  )
}