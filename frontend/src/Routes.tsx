import { Routes, Route, Outlet } from 'react-router-dom';
import LoginSignUp from './pages/loginSignUp';
import Home from './pages/home';
import RandomUsers from './components/randomUsers';
import HttpCats from './components/httpCats';
import RandomDogs from './components/randomDogs';
import Customers from './components/customers';

export default function MyRoutes(): JSX.Element{
  return(
    <Routes>
      <Route index path='/' element={<LoginSignUp title='Login' buttonText='Entrar' showCreateAccount={true} showRemenberMe={true} isLogin={true}/>} />
      <Route path='/signup' element={<LoginSignUp title='Criar conta' buttonText='Criar' showCreateAccount={false} showRemenberMe={false} isLogin={false}/>} />
      <Route path='/home' element={<Home/>}>
        <Route path='/home/randomUsers' element={<RandomUsers/>} />
        <Route path='/home/httpCats' element={<HttpCats/>} />
        <Route path='/home/randomDogs' element={<RandomDogs/>} />
        <Route path='/home/customers' element={<Customers/>} />
      </Route>
    </Routes>
  )
}