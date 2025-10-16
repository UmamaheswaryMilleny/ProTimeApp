import { IEmailSerivice } from '../../domain/services/IEmailService';

import nodemailer from 'nodemailer'


export class EmailService implements IEmailSerivice{
    private transporter;
    constructor(){
        
this.transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS,
    }
})


    }


async sendOtp(email:string,otp:string):Promise<void>{
    
const htmlContent = `
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9f9f9; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 30px; text-align: center;">
      
      <h1 style="color: #4CAF50;">👋 Hello!</h1>
      <h2 style="color: #333;">Welcome to ProTime App</h2>
      
      <p style="font-size: 16px; color: #555;">
        We're thrilled to have you onboard. Use the OTP below to verify your email:
      </p>
      
      <div style="font-size: 32px; font-weight: bold; color: #FF5722; margin: 20px 0;">
        ${otp}
      </div>
      
      <p style="font-size: 14px; color: #999;">
        ⚠️ This OTP will expire in <strong>60 seconds</strong>.
      </p>
      
      <p style="margin-top: 30px; font-size: 12px; color: #bbb;">
        If you did not sign up for ProTime App, please ignore this email.
      </p>
      
    </div>
  </div>
`;

    const mailOptions={
        from:process.env.EMAIL_USER,
        to:email,
        subject:'Your OTP code',
        text:`Your OTP code is ${otp}. It will expire in 5 minutes`,
        html:htmlContent
    }

await this.transporter.sendMail(mailOptions)
console.log(`OTP sent to ${email}`)

}
}