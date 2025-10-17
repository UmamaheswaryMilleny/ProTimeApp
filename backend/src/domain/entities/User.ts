import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';
import { UserRole } from '../enums/UserRole';

export abstract class User {
  protected constructor(
    public readonly id: string,
    public name: string,
    public email: Email,
    // public password: Password,
    public isVerified: boolean,
    public userRole: UserRole,
    // public googleId?: string,
    public readonly createdAt: Date = new Date(),
    public readonly updatedAt: Date = new Date()
  ) {}
    
  verifyUser():void{
    this.isVerified = true;
  }
}

export class EmailUser extends User{
  constructor(
    id: string,
    name: string,
    email: Email,
    public password: Password,
    isVerified:boolean=false,
    userRole: UserRole = UserRole.USER

  ){
    super(id,name,email,isVerified,userRole)
  }
}


export class  GoogleUser extends User{
  constructor(
    id: string,
    name: string,
    email: Email,
    public googleId:string,
    isVerified:boolean=true,
    userRole:UserRole=UserRole.USER


  ){
    super(id,name,email,isVerified,userRole)
  }
}





