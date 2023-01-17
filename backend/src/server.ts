import express from 'express';
import helmet from 'helmet'
import dotenv from 'dotenv'
import cors from 'cors'

import Loaders from './loaders';

import customerRoutes from './routes/customerRoutes';
import userRoutes from './routes/userRoutes';
import APIRoutes from './routes/APIRoutes';
import tokenRoutes from './routes/tokenRoutes';


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(cors())




app.use('/customer', customerRoutes)
app.use('/user', userRoutes)
app.use('/API', APIRoutes)
app.use('/tokens', tokenRoutes)

dotenv.config()

Loaders.start()
app.listen(process.env.APP_PORT, () => console.log(`Server is running on port ${process.env.APP_PORT}`))