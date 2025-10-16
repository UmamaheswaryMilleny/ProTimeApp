import { IPasswordServices } from "../../domain/services/IPasswordService";
import bcrypt from "bcryptjs"

export class passwordService implements IPasswordServices{
    async hashPassword(password: string):Promise<string>{
        return await bcrypt.hash(password,10)
    }

  async comparePassword(password: string, hash: string):Promise<boolean>{
    return await bcrypt.compare(password,hash)
  }

}