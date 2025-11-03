import { IEmailService } from '../../application/interfaces/services/IEmailService';
import { config } from '../config/env';
import nodemailer from 'nodemailer';

export class EmailService implements IEmailService {
  private transporter=  nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.emailUser,
        pass: config.emailPass,
      },
    });


async sendEmail(to:string,subject:string,body:string):Promise<void>{
  await this.transporter.sendMail({
    from:config.emailUser,
    to,
    subject,
    html:body
  })
}

async sendOtp(email: string, otp: string): Promise<void> {
  const body =  `<h3>Your verification code is : ${otp}</h3>`
  await this.sendEmail(email,'Verify your email',body)
}


  }

//   async sendOtp(email: Email, otp: OTP): Promise<void> {
//     const htmlContent = `
//   <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f9f9f9; padding: 30px;">
//     <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); padding: 30px; text-align: center;">
      
//       <h1 style="color: #4CAF50;">👋 Hello!</h1>
//       <h2 style="color: #333;">Welcome to ProTime App</h2>
      
//       <p style="font-size: 16px; color: #555;">
//         We're thrilled to have you onboard. Use the OTP below to verify your email:
//       </p>
      
//       <div style="font-size: 32px; font-weight: bold; color: #FF5722; margin: 20px 0;">
//         ${otp.value}
//       </div>
      
//       <p style="font-size: 14px; color: #999;">
//         ⚠️ This OTP will expire in <strong>60 seconds</strong>.
//       </p>
      
//       <p style="margin-top: 30px; font-size: 12px; color: #bbb;">
//         If you did not sign up for ProTime App, please ignore this email.
//       </p>
      
//     </div>
//   </div>
// `;

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email.value,
//       subject: 'Your OTP code',
//       text: `Your OTP code is ${otp.value}. It will expire in 5 minutes`,
//       html: htmlContent,
//     };

//     await this.transporter.sendMail(mailOptions);
//     console.log(`OTP sent to ${email.value}`);
//   }
// }
// import { IEmailService } from '../../application/interfaces/services/IEmailService';
// import { config } from '../config/env';
// import nodemailer from 'nodemailer';

// export class EmailService implements IEmailService {
//   private transporter;
//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: config.emailUser,
//         pass: config.emailPass,
//       },
//     });
