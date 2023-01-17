import User from '../models/userModel'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Request, Response } from "express";

class TokenController {
  async create(req: Request, res: Response) {
    const  { userName = '', password = '' } = req.body
  
    if(!userName || !password){
      return res.status(401).json({
        errors: ['Credenciais inválidas']
      })
    }
   
    const user = await User.findOne({userName})
  
    if(!user){
      return res.status(401).json({
        errors: ['Usuário não encontrado']
      })
    }
  
    if(!(await bcryptjs.compare(password, user.password))){
      return res.status(401).json({
        errors: ['Senha inválida']
      })
    }
  
    const { id } = user
    const token = jwt.sign( { userName, id }, process.env.TOKEN_SECRET || '2h', {
      expiresIn: process.env.TOKEN_EXPIRATION
    })
    res.json({token})
  }
}




export default new TokenController()
