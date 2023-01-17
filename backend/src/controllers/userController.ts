import User from "../models/userModel";
import { Request, Response } from "express";

class UserController{
  async index(_: Request, res: Response){
    try{
      const user = await User.find()

      return res.status(200).json( user )
    }catch{
      return res.status(400).json({errors: ["Falha ao recuperar usuários"]})
    }
  }


  async create(req: Request, res: Response){
    try{
      const userName = await User.findOne({userName: req.body.userName})
      if(userName)
        return res.status(400).json({errors: ["userName já está em uso!"]})

      await User.create(req.body)
      return res.status(200).json({success: ["Usuário criado com sucesso!"]})
    }catch(error: any){
      return res.status(400).json({errors: Object.values(error.errors).map((el:any) => el.message)})
    }
  }


  async read(req: Request, res: Response){
    try{
      const user = await User.findById(req.body.id)

      if(!user)
        return res.status(404).json({errors: ["Usuário não encontrado!"]})
      
      return res.status(200).json(req.body)
    }catch{
      return res.status(400).json({errors: ["Falha ao recuperar usuário"]})
    }
  }


  async delete(req: Request, res: Response){
    try{
      const customerDeleted = await User.findByIdAndDelete(req.body.id)
      
      if(!customerDeleted)
        return res.status(404).json({errors: ["Usuário não encontrado!"]})
      
      return res.status(200).json({success: ["Usuário deletado com sucesso!"]})
    }catch{
      return res.status(400).json({errors: ["Falha ao deletar usuário!"]})
    }
  }
}

export default new UserController()