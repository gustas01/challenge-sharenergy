import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

import { IUser } from "../interfaces/IUser";

const userSchema = new mongoose.Schema<IUser>({
  userName: {type: String, required: true, unique: true, minlength: [3, 'O userName deve ter pelo menos 3 caracteres!']},
  password: {type: String, required: true, minlength: [8, 'A senha deve ter pelo menos 8 caracteres!']}
});

userSchema.pre('save', async function() {
  this.password = await bcryptjs.hash(this.password, 8)
})

  const User = mongoose.model<IUser>('User', userSchema)

  export default User