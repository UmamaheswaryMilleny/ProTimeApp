import { User } from "../entities/User";
export interface IUserRepositories{
    findByEmail(email:string):Promise<User | null>
    findById(id:string):Promise<User | null>
    createUser(user:User):Promise<User>
    verifyUser(userId:string):Promise<User>
}