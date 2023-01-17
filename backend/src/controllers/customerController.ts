import Customer from "../models/customerModel";
import { Request, Response } from "express";

class CustomerController{
  async index(_: Request, res: Response){
    try{
      const customers = await Customer.find()

      return res.status(200).json( customers )
    }catch{
      return res.status(400).json({errors: ["Falha ao recuperar clientes"]})
    }
  }


  async create(req: Request, res: Response){
    try{
      const emailAlreadyExists = await Customer.findOne({email: req.body.email})
      if(emailAlreadyExists)
        return res.status(400).json({errors: ["Email já está em uso!"]})

      const cpfAlreadyExists = await Customer.findOne({cpf: req.body.cpf})
      if(cpfAlreadyExists)
        return res.status(400).json({errors: ["Este CPF já está cadastrado!"]})

      await Customer.create(req.body)
      return res.status(200).json({success: ["Cliente criado com sucesso!"]})
    }catch{
      return res.status(400).json({errors: ["Falha ao criar cliente"]})
    }
  }


  async read(req: Request, res: Response){
    try{
      const customer = await Customer.findById(req.params.id)

      if(!customer)
        return res.status(404).json({errors: ["Usuário não encontrado!"]})
      
      return res.status(200).json(customer)
    }catch{
      return res.status(400).json({errors: ["Falha ao recuperar cliente"]})
    }
  }


  async update(req: Request, res: Response){
    try{
      const customerUpdated = await Customer.findByIdAndUpdate(req.params.id, req.body)

      if(!customerUpdated)
        return res.status(404).json({errors: ["Usuário não encontrado!"]})

      return res.status(200).json({success: ["Cliente atualizado com sucesso!"]})
    }catch(error: any){
      if(error.codeName === 'DuplicateKey' && error.keyValue.cpf)
        return res.status(401).json({errors: ["CPF já cadastrado!"]})      

      if(error.codeName === 'DuplicateKey' && error.keyValue.email)
        return res.status(401).json({errors: ["Email já está em uso!"]}) 

      return res.status(400).json({errors: ["Falha ao atualizar dados do cliente!"]})
    }
  }


  async delete(req: Request, res: Response){
    try{
      const customerDeleted = await Customer.findByIdAndDelete(req.params.id)
      
      if(!customerDeleted)
        return res.status(404).json({errors: ["Usuário não encontrado!"]})
      
      return res.status(200).json({success: ["Usuário deletado com sucesso!"]})
    }catch{
      return res.status(400).json({errors: ["Falha ao deletar cliente"]})
    }
  }
}

export default new CustomerController()