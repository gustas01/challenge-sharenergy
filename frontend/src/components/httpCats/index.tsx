import { useState } from 'react'
import constants from '../../utils/contants';
import Loading from '../loading';
import './style.css'

export default function HttpCats(){
  const [httpCode, setHttpCode] = useState(0)
  const [catImageURL, setCatImageURL] = useState('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function handleHttpCatCodeSubmit(e: React.FormEvent){
    e.preventDefault()
    setIsLoading(true)
    setCatImageURL(await (await fetch(`${constants.baseURL}/API/catImage/${httpCode}`)).json());
    setIsLoading(false)
  }

  if(isLoading) return <Loading isLoading={true}/>
  return (
    <section className='httpCatsContainer'>
      <form action="" className='catsFormSearch' onSubmit={e => handleHttpCatCodeSubmit(e)}>
        <label htmlFor="httpInputCode"> </label>
        <input type="number" id='httpInputCode' placeholder='Digite um código Http:' onChange={e => setHttpCode(Number(e.target.value))} />
        <button>Enviar</button>
      </form>

      <img src={catImageURL} alt="" />
    </section>
  )
}