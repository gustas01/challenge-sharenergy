import './style.css'
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { FaCat } from 'react-icons/fa'
import { BsFillPeopleFill } from 'react-icons/bs'
import { GiSittingDog } from 'react-icons/gi'
import { IoIosPeople } from 'react-icons/io'
import UserMenu from '../userMenu';
import { useNavigate } from 'react-router-dom';


export default function Header() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate()

  function handleNavigateToUsers(){
    navigate('/home/randomUsers')
  }

  function handleNavigateToCats(){
    navigate('/home/httpCats')
  }

  function handleNavigateToDogs(){
    navigate('/home/randomDogs')
  }

  function handleNavigateToCustomers(){
    navigate('/home/customers')
  }

  return (
    <Box sx={{ width: '100%', height: '56px'}}>
      <BottomNavigation
      sx={{backgroundColor: '#121212', alignItems: 'center', justifyContent: 'space-around'}}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction onClick={handleNavigateToUsers} sx={{color: '#fff'}} label="Random Users" icon={<BsFillPeopleFill size={24}/>} />
        <BottomNavigationAction onClick={handleNavigateToCats} sx={{color: '#fff'}} label="Cats" icon={<FaCat size={24}/>} />
        <BottomNavigationAction onClick={handleNavigateToDogs} sx={{color: '#fff'}} label="Dogs" icon={<GiSittingDog size={24}/>} />
        <BottomNavigationAction onClick={handleNavigateToCustomers} sx={{color: '#fff'}} label="Customers" icon={<IoIosPeople size={24}/>} />

        <UserMenu/>
      </BottomNavigation>
    </Box>
  );
}