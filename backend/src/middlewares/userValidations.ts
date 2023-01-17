import { Request, Response, NextFunction } from "express";

export default async (req: Request, res: Response, next: NextFunction) => {
  const { userName, password } = req.body

  if(!userName || !password)
    return res.status(401).json({errors: ["Todos os campos são obrigatórios!"]})

  return next()
}