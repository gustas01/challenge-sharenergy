import { Button, Input } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { ICustomer } from '../../interfaces/ICustomer'
import constants from '../../utils/contants'
import CustomerItem from '../customerItem'
import './style.css'

export default function Customers(){
  const [customers, setCustomers] = useState<ICustomer[]>([])
  const [showAddCustomerForm, setShowAddCustomerForm] = useState<boolean>(false)
  
  const [customerName, setCustomerName] = useState<string>('')
  const [customerEmail, setCustomerEmail] = useState<string>('')
  const [customerPhone, setCustomerPhone] = useState<string>('')
  const [customerAddress, setCustomerAddress] = useState<string>('')
  const [customerCPF, setCustomerCPF] = useState<string>('')

  async function getCustomers(){
    setCustomers(await (await fetch(`${constants.baseURL}/customer`)).json());
  }

  async function handleAddCustomer(e: React.FormEvent){
    try{
      e.preventDefault()
      const newCustomerData = {
        name: customerName,
        email: customerEmail,
        phone: customerPhone,
        address: customerAddress,
        cpf: customerCPF
      }

      const messageResponse = await (await fetch(`${constants.baseURL}/customer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newCustomerData)
      })).json()
    
      if(messageResponse.errors)
        throw (messageResponse.errors[0])
        
      getCustomers()
      toast.success(messageResponse.success[0]);
      
      setCustomerName('')
      setCustomerEmail('')
      setCustomerPhone('')
      setCustomerAddress('')
      setCustomerCPF('')
    }catch(e: any){
      toast.error(e);
    }
    
  }

  async function handleEditCustomer(e: ICustomer){
    try{
      const messageResponse = await (await fetch(`${constants.baseURL}/customer/${e._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(e)
      })).json()
      
      if(messageResponse.errors)
        throw (messageResponse.errors[0])

      toast.success(messageResponse.success[0])
      
      getCustomers()
      
    }catch(e: any){
      toast.error(e);
    }
  }

  async function handleDeleteCustomer(e: ICustomer){
    try{
      const messageResponse = await (await fetch(`${constants.baseURL}/customer/${e._id}`, {
        method: 'DELETE',
      })).json()
      
      if(messageResponse.errors)
        throw (messageResponse.errors[0])

      toast.success(messageResponse.success[0])
      
      getCustomers()
      
    }catch(e: any){
      toast.error(e);
    }
  }


  useEffect(() => {
    getCustomers()
  }, [])


  return (
    <section className='customerContainer'>
      <Button variant='contained' sx={{marginBottom: '16px'}} onClick={() => setShowAddCustomerForm(!showAddCustomerForm)}>Adicionar cliente</Button>

    {showAddCustomerForm && 
    <form className='formAddCustomer' onSubmit={e => handleAddCustomer(e)}>
      <Input placeholder='Nome' value={customerName} required onChange={e => setCustomerName(e.target.value)}/>
      <Input placeholder='Email' value={customerEmail} required type='email' onChange={e => setCustomerEmail(e.target.value)}/>
      <Input placeholder='Telefone' value={customerPhone} required onChange={e => setCustomerPhone(e.target.value)}/>
      <Input placeholder='Endereço' value={customerAddress} required onChange={e => setCustomerAddress(e.target.value)}/>
      <Input placeholder='CPF' value={customerCPF} required onChange={e => setCustomerCPF(e.target.value)}/>
      <Button type='submit' variant='outlined' color='primary'>Adiconar</Button>
    </form>}

      {customers.map(customer => 
      <CustomerItem 
        key={customer._id} 
        customer={customer} 
        handleDeleteCustomer={handleDeleteCustomer}
        handleEditCustomer={handleEditCustomer}
        />)}
    </section>
  )
}