import { useState, useEffect, useCallback, HtmlHTMLAttributes } from 'react'
import { IRandomUser } from '../../interfaces/IRandomUser'
import constants from '../../utils/contants'
import RandomUserCard from '../randomUserCard'
import Pagination from '@mui/material/Pagination';
import './style.css'
import Loading from '../loading';

export default function RandomUsers(){
  const [randomUsers, setRandomUsers] = useState(Array<IRandomUser>)
  const [randomUsersDB, setRandomUsersDB] = useState(Array<IRandomUser>)
  const [searchType, setSearchType] = useState<string>('Nome')
  const [randomUserSearch, setRandomUserSearch] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(true)
  


  const getUsers = useCallback(async (page: number) => {
    const data: {info: {}, results: IRandomUser[]} = await (await fetch(`${constants.baseURL}/API/randomUsers/${page}`)).json()
    setRandomUsers(data?.results); 
    setRandomUsersDB(data?.results) 
    setIsLoading(false)
  }, [])

  function handleSelectSearchType(e: any){
    setSearchType(e.target.value)
    setRandomUserSearch('')
    setRandomUsers(randomUsersDB)
  }

  function handleSearch(e: any){
    let filteredUsers: Array<IRandomUser> = []
    setRandomUserSearch(e.target.value)

    switch(searchType){
      case 'Nome':
        filteredUsers = randomUsersDB.filter(el => el.name.first.toLowerCase().startsWith(e.target.value.toLocaleLowerCase()))
        setRandomUsers(filteredUsers)
        break;
      case 'Email':
        filteredUsers = randomUsersDB.filter(el => el.email.toLowerCase().startsWith(e.target.value.toLocaleLowerCase()))
        setRandomUsers(filteredUsers)
        break;
      case 'userName':
        filteredUsers = randomUsersDB.filter(el => el.login.username.toLowerCase().startsWith(e.target.value.toLocaleLowerCase()))
        setRandomUsers(filteredUsers)
        break;
    }
    
    if(e.target.value === '')
      setRandomUsers(randomUsersDB)

  }


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    getUsers(value)
  };

  useEffect(() => {
    getUsers(1)
  },[])

  if(isLoading) return <Loading isLoading={true}/>
  return (
    <section className='randomUsersContainer'>
      <form className='randomUsersSearch'>
        <select name="" id="" onChange={e => handleSelectSearchType(e)}>
          <option value="Nome">Nome</option>
          <option value="Email">Email</option>
          <option value="userName">userName</option>
        </select>
        <input type="text" value={randomUserSearch} onChange={e => handleSearch(e)} />
      </form>

      <div className='randomUsersGrid'>
        {randomUsers?.map(el => <RandomUserCard key={el.email} randomUser={el} />)}
      </div>

      {!randomUserSearch &&<Pagination className='pagination' sx={{display: 'flex', justifyContent: 'center', margin: '15px'}} color='primary' variant='outlined' count={1000} onChange={handleChange} />}
    </section>
  )
}