import jwt from "jsonwebtoken"
import User from "../models/userModel"
import { Request, Response, NextFunction } from "express";

export default async(req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if(!authorization)
    return res.status(401).json({
      errors: ['Login required']
    })

  const [, token] = authorization.split(' ')

  try{
    const dados: any = jwt.verify(token, process.env.TOKEN_SECRET || '')    

    const user = await User.findOne({userName: dados.userName})

    if(!user){
      return res.status(401).json({
        errors: ['Usuário inválido']
      })
    }

    req.body = dados
    return next()
  }catch(e){
    return res.status(401).json({
      errors: ['Token expirado ou inválido']
    })
  }
}
