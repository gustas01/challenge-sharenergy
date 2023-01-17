import './style.css'
import logo from '../../assets/logoPequena.svg'
import { Input } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { toast} from 'react-toastify'
import constants from '../../utils/contants'
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordLine } from 'react-icons/ri';
import { Link } from 'react-router-dom'

import { getCookie, getUserData } from '../../utils/servies'

type propsType = {
  title: string,
  buttonText: string,
  showRemenberMe: boolean,
  showCreateAccount: boolean,
  isLogin: boolean 
}

export default function LoginSignUp(props: propsType): JSX.Element{
  const navigate = useNavigate()

  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)



  function handleGetUserName(event: React.ChangeEvent<HTMLInputElement>){      
    setUserName(event.target.value)
  }

  function handleGetPassword(event: React.ChangeEvent<HTMLInputElement>){        
    setPassword(event.target.value)
  }

  function handleRememberMe(event: React.ChangeEvent<HTMLInputElement>){
    setRememberMe(event.target.checked);    
  }

  async function handleLogin(event: React.MouseEvent){
    event.preventDefault()
    try{

      if(!userName || !password){
        toast.warning('Campos obrigatórios não preenchidos')
        return 
      }
      
      let url = ''
      if(props.isLogin){
        url = `${constants.baseURL}/tokens`
      }else{
        url = `${constants.baseURL}/user`
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userName, password})
      })
      
      const data = await response.json();
      
      if(data.errors)
        throw new Error(data.errors[0])
      
      if(props.isLogin){
        let tokenExpiration = ''
        if(rememberMe)
          tokenExpiration = `Expires=${new Date((await getUserData(data.token)).exp*1000).toUTCString()};path=/;`         
        
        document.cookie = `token = ${data.token};${tokenExpiration};path=/;`
        navigate('/home/randomUsers')
      }else{
        toast.success('Usuário criado com sucesso!')
        navigate('/')
      }
    }catch(errors: any){
      toast.error(`${errors.toString().slice(7)}`)
    }
  }


  useEffect(() => {
    if(getCookie('token')){
      navigate('/home/randomUsers')
    }
  }, [])

    return (
        <div className="loginContainer">
          <section className="loginSection">
            <img src={logo} alt="logo" className='logoLogin' />
            <h1>{props.title}</h1>
            <form action="">
              <span>
                <AiOutlineUser/>
                <Input className='inputLogin' type="text" placeholder='Digite seu usuário' required onChange={handleGetUserName}/>
              </span>
              <span>
                <RiLockPasswordLine/>
                <Input className='inputLogin' type="password" placeholder='Digite sua senha' required onChange={handleGetPassword}/>
              </span>

              <span className='rememberMeAndButton'>
                {props.showRemenberMe && <label htmlFor="rememberMe" className='rememberMe'>
                  <input type="checkbox" name="" onChange={handleRememberMe} id="rememberMe" size={46}/>Remember-me
                </label>}
                <button className='buttonForm' onClick={e => handleLogin(e)}>{props.buttonText}</button>
                 {props.showCreateAccount && <Link to='signup'>Criar Conta</Link>}
                 {!props.showCreateAccount && <Link to='/'>Voltar e fazer login</Link>}
              </span>
            </form>
          </section>
        </div>
    )
}