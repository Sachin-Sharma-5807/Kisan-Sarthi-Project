import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();

export class Gmail {
    async mail(data,template) {
        // create reusable transporter object using the default SMTP transport
        const transporter = nodemailer.createTransport({
            port: 465,               // true for 465, false for other ports
            host: "smtp.gmail.com",
            auth: {
                user: "sachinsharma88786@gmail.com",
                pass: "ieus gdlw jjhs owca",
            },
            secure: true,
        });
        const mailData = {
            from: 'sachinsharma88786@gmail.com',  // sender address
            to: data.email,   // list of receivers
            subject: 'Sending Email using Node.js',
          html: template 
        };
    
    transporter.sendMail(mailData, function(err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
    return;
}


generateOtp(limit, type = "digit") {
    let characters = "0123456789";
    if (type === "string") {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    }
    let otp = "";
    for (let i = 0; i < limit; i++) {
        otp += characters[Math.floor(Math.random() * characters.length)];
    }
    return otp;
}

}