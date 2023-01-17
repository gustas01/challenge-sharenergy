import { Request, Response } from "express";
import RandomUserAPI  from '../services/randomUserAPI'
import HttpCatAPI  from '../services/httpCatAPI'
import RandomDogtAPI  from '../services/randomDogtAPI'

class APIController{
  async getRandomUsers(req: Request, res: Response){
    try{
      const results = await RandomUserAPI.randomUserAPI(Number(req.params.page))
      res.status(200).json(results)
    }catch{
      res.status(400).json({errors: ["Erro ao buscar na API!"]})
    }
  }


  async getHttpCatImage(req: Request, res: Response){
    try{
      const results = await HttpCatAPI.httpCatAPI(Number(req.params.code))
      res.status(200).json(results)
    }catch(err: any){
      res.status(400).json({errors: ["Erro ao buscar na API!"]})
    }
  }


  async getRandomDogImage(req: Request, res: Response){
    try{
      const results = await RandomDogtAPI.randomDogtAPI()
      res.status(200).json(results)
    }catch{
      res.status(400).json({errors: ["Erro ao buscar na API!"]})
    }
  }



}


export default new APIController()