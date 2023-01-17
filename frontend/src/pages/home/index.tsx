import { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { getCookie } from '../../utils/servies'
import Header from '../../components/header'
import './style.css'

export default function Home(){
  const navigate = useNavigate()

  useEffect(() => {
    if(!getCookie('token')){
      navigate('/')
    }
  }, [])

  
  return(
    <main className='homeContainer'>
      <Header/>
      <Outlet/>
    </main>
  )
}