import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';
import { UserRole } from '../enums/UserRole';

export class User {
  private constructor(
    public readonly id: string,
    public name: string,
    public email: Email,
    public password: Password,
    public isVerified: boolean,
    public userRole: UserRole,
    public googleId?: string,
    public readonly createdAt: Date = new Date()
  ) {}

static createNew(
  id:string,name:string,email:Email,password:Password,role:UserRole=UserRole.USER
):User{
  return new User(id,name,email,password,false,role)
}
  verifyUser(){
    this.isVerified=true
  }
}
