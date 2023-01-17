import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, phone, address, cpf } = req.body

  if(!name || !email || !phone || !address || !cpf)
    return res.status(401).json({errors: ["Todos os campos são obrigatórios!"]})

  return next()
}