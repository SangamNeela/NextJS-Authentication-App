import User from "@/models/userModel";
import nodemailer from "nodemailer";
import { Resend } from 'resend';
import bcryptjs from "bcryptjs";
import Link from "next/link";
var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "90f4270b5e4127",
    pass: "e1bf6721928661"
  }
});

  async function sendMail(email:string,emailType:string,userID:string){
    try {
        const salt= await bcryptjs.genSalt(10);
        const token = await bcryptjs.hash(userID,salt);
        if(emailType==="VERIFY"){
          console.log("VERIFICATION");
          await User.findByIdAndUpdate(userID,{
            $set:{
              verifyToken:token,
              verifyTokenExpiry:Date.now()+3600000
            }
          })
        }
        else if(emailType==="RESET"){
          await User.findByIdAndUpdate(userID,{
            $set:{
              forgotPasswordToken:token,
            forgotPasswordTokenExpiry:Date.now()+3600000
            }
          })
        }
        const resend = new Resend(process.env.RESEND_API_KEY);
        const emailResponse = await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: email,
          subject: emailType==="VERIFY"?"Verification Mail":"password Verification",
          html: `<h1>Thank You for Signing in</h1>
                <center><h3>${emailType === "VERIFY" ? "verify your email" : "reset your password"}</h3></center>
                <center>
                <button style="background-color: #007bff;color: white; border: none;padding: 10px 20px; font-size: 16px;border-radius: 5px;
                cursor: pointer; text-decoration: none; ">
                <a href="${process.env.DOMAIN}/verifyemail?token=${token}" style=" color: inherit; text-decoration: none;">
                Verify
                </a>
                </button>
                </center>
                <p>or copy and paste the link below in your browser.<br> ${process.env.DOMAIN}/verifyemail?token=${token}</p>`,
        });
          console.log("emailREsponse = ",emailResponse)
        return emailResponse;
    } catch (error) {
        console.log("error occured while sending mail",error);
    }

  }

  export default sendMail;