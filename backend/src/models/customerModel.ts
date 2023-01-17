import mongoose from "mongoose";
import { ICustomer } from "../interfaces/ICustomer";

const customerSchema = new mongoose.Schema<ICustomer>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    cpf: {type: String, required: true, unique: true},
  });

  const Customer = mongoose.model<ICustomer>('Customer', customerSchema)

  export default Customer