import { MdEmail, MdAlternateEmail } from 'react-icons/md'
import { BsClipboardMinus } from 'react-icons/bs'
import './style.css'
import { IRandomUser } from '../../interfaces/IRandomUser'

export default function RandomUserCard(props: {randomUser: IRandomUser}){
  return (
    <div className="card">
      <img src={props.randomUser.picture.large} alt="" />
      <div className='cardContent'>
        <p><strong> {props.randomUser.name.title} {props.randomUser.name.first} {props.randomUser.name.last} </strong></p>
        <p><MdEmail/> {props.randomUser.email}</p>
        <p><MdAlternateEmail/> {props.randomUser.login.username}</p>
        <p><BsClipboardMinus/> {props.randomUser.dob.age}</p>
      </div>
    </div>
  )
}