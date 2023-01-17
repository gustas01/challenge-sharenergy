import { useState, useEffect } from 'react'
import { FiRefreshCcw } from 'react-icons/fi'
import Button from '@mui/material/Button';
import constants from '../../utils/contants';
import './style.css'
import Loading from '../loading';

export default function RandomDogs(){
  const [dogImageURL, setDogImageURL] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  async function handleRefreshImage(){
    setIsLoading(true)
    setDogImageURL(await (await fetch(`${constants.baseURL}/API/dogImage`)).json());
    setIsLoading(false)
  }

  useEffect(() => {
    handleRefreshImage()
  }, [])

  if(isLoading) return <Loading isLoading={true}/>
  return (
    <section className='randomDogsContainer'>
      <Button onClick={handleRefreshImage} variant="outlined"> <FiRefreshCcw/> </Button>
      <img src={dogImageURL} alt="" />
    </section>
  )
}