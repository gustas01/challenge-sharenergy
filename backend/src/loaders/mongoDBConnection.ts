import mongoose from 'mongoose'

async function startDB(){
    mongoose.set('strictQuery', false);
    
    await mongoose.connect(`${process.env.URL_CONNECTION}`)
}

export default startDB