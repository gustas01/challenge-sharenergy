import { Accordion, AccordionDetails, AccordionSummary, Button, Input, TextField, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState, useEffect } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import { ICustomer } from '../../interfaces/ICustomer'
import './style.css'

type IProps = {
  customer: ICustomer,
  handleDeleteCustomer: (customer: ICustomer) => void,
  handleEditCustomer: (customer: ICustomer) => void,
}

export default function CustomerItem(props: IProps){
  const [customerName, setCustomerName] = useState<string>(props.customer.name)
  const [customerEmail, setCustomerEmail] = useState<string>(props.customer.email)
  const [customerPhone, setCustomerPhone] = useState<string>(props.customer.phone)
  const [customerAddress, setCustomerAddress] = useState<string>(props.customer.address)
  const [customerCPF, setCustomerCPF] = useState<string>(props.customer.cpf)
  const [editMode, setEditMode] = useState<boolean>(false)


  function handleUpdateCustomer(){
    const updatedCustomer: ICustomer = {
      _id: props.customer._id,
      name: customerName,
      email: customerEmail,
      phone: customerPhone,
      address: customerAddress,
      cpf: customerCPF
    }
    setEditMode(false)
    props.handleEditCustomer(updatedCustomer)
  }

  function cancelEdit(){
    setCustomerName(props.customer.name)
    setCustomerEmail(props.customer.email)
    setCustomerPhone(props.customer.phone)
    setCustomerAddress(props.customer.address)
    setCustomerCPF(props.customer.cpf)
    setEditMode(false)
  }

  return (
      <Accordion sx={{backgroundColor: '#1E1E1E', color: '#fff', marginBottom: '6px', borderRadius: '5px'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon sx={{color: '#fff'}}/>}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{props.customer.name}</Typography>
        </AccordionSummary>
        <AccordionDetails className='accordionContent'>
          <TextField  
            disabled={!editMode}
            placeholder='Nome'
            value={customerName}
            onChange={e => setCustomerName(e.target.value)}
          />
          <TextField 
            disabled={!editMode}
            placeholder='Email'
            value={customerEmail}
            onChange={e => setCustomerEmail(e.target.value)}
          />
          <TextField 
            disabled={!editMode}
            placeholder='Telefone'
            value={customerPhone}
            onChange={e => setCustomerPhone(e.target.value)}
          />
          <TextField 
            disabled={!editMode}
            placeholder='Endereço'
            value={customerAddress}
            onChange={e => setCustomerAddress(e.target.value)}
          />
          <TextField 
            disabled={!editMode}
            placeholder='CPF'
            value={customerCPF}
            onChange={e => setCustomerCPF(e.target.value)}
          />
          <span className='customerButtons'>
            {!editMode && <Button variant="contained" onClick={() => setEditMode(!editMode)}>Editar</Button>}
            {!editMode && <Button variant="contained" color='error' onClick={() => props.handleDeleteCustomer(props.customer)}>Apagar</Button>}
            {editMode && <Button variant="contained" onClick={handleUpdateCustomer}>Salvar</Button>}
            {editMode && <Button variant="contained" color='error' onClick={cancelEdit}>Cancelar</Button>}
          </span>
        </AccordionDetails>
      </Accordion>
  )
}