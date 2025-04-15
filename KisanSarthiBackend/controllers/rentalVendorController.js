import { validationResult } from "express-validator";
import RentalVendor from "../models/RentalVendor.js";
import RentalMachine from "../models/RentalMachine.js";
import bcrypt from "bcryptjs";
import { Gmail } from "../middleware/SendMail.js";
import { Template } from "../middleware/Template.js";



//---------------------------------Register-------------------------

export const Register = async (req, res) => {
    // **Validate Request**
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: "Validation failed",
            errors: errors.array(),
        });
    }

    try {
        const { FullName, Address:VendorAdd, Email, Password, PhoneNumber:VendorContactNumber } = req.body;

        // **Check if the user already exists**
        let existingUser = await RentalVendor.findOne({ where: { Email } });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already registered" });
        }

        // **Hash Password**
        let saltKey = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(Password, saltKey);

        // **Generate OTP (6-digit code)**
        const gmailService = new Gmail();
        let otpCode = gmailService.generateOtp(6);
        let otp = JSON.stringify({ code: otpCode, timestamp: Date.now() });
  
        console.log("Generated OTP:", otpCode);

        // **Create new user**
        let newUser = await RentalVendor.create({
            FullName,
            VendorAdd,
            Email,
            Password: hashPassword,
            VendorContactNumber,
            otp,
        });

        // **Send OTP via Email**
       
        const emailData = {
            appName: "KishanSarthi",
            email: newUser.Email,
            otp: otpCode, // Send actual OTP code
            name: newUser.FullName,
            subject: "OTP Verification",
            year: new Date().getFullYear(),
        };

        const templateData = new Template().getOtpTemplate(emailData);
        await gmailService.mail(emailData, templateData);

        return res.status(201).json({
            message: "Sign-up successful. Please verify OTP.",
            user: {
                id: newUser.id,
                FullName: newUser.FullName,
                Email: newUser.Email,
                VendorContactNumber: newUser.VendorContactNumber,
                VendorAdd: newUser.VendorAdd,
            },
        });
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

  
export const VerifyOtp = async (req, res) => {
    try {
        const { Email, otp } = req.body;

        if (!Email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required" });
        }

        const user = await RentalVendor.findOne({ where: { Email } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const storedOtp = user.otp ? JSON.parse(user.otp) : null;

        if (!storedOtp) {
            return res.status(400).json({ error: "No OTP found for this user" });
        }

        if (Date.now() - storedOtp.timestamp > 300000) {
            return res.status(400).json({ error: "OTP has expired, please request a new one" });
        }

        if (storedOtp.code !== otp) {
            return res.status(400).json({ error: "Invalid OTP, please try again!" });
        }

        // ✅ Do not update OTP to null after successful verification
        return res.status(200).json({ message: "OTP verified successfully" });

    } catch (error) {
        console.error("OTP Verification Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
//---------------------------------Log-In------------------------------


export const LogIn=async(req,res,next)=>{

    try{
        let {email,password}=req.body;
        console.log("data in side backend : ",email,password);
        let user= await RentalVendor.findOne({where:{email}});
      
        if(user){
            let hashPassword=user.Password;
            let status=bcrypt.compareSync(password,hashPassword);

            // status=true;
            console.log("Status : ",status);
            

            return status ? res.status(201).json({message:"Log-In success", user}) : res.status(500).json({message:"Invalid Password"});
        }
        else{
            return res.status(401).json({error: "Invalid email id"});
        }

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server error"});
    }

}

//---------------------------------Get-Profile------------------------------

export const GetProfile=async(req,res,next)=>{

    try {
        let id=req.params.id;
        const user = await RentalVendor.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User ID not found" });
        }
        else{
        const GetProfile=await RentalVendor.findOne();
        return res.status(200).json({GetProfile});
    }
    } catch (err) {
        
        console.log(err);
        return res.status(500).json({error : "Internal Server Error"});
    
    }

}

//---------------------------------Update-Profile------------------------------

export const UpdateProfile=async(req,res,next)=>{
    try {
        let id=req.params.id;
        const {FullName,VendorAdd,Email,Password,VendorContactNumber}=req.body;
        console.log(FullName,VendorAdd,Email,Password,VendorContactNumber);

        const user = await RentalVendor.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User ID not found" });
        }
         
        const isEmailValid = await verifyEmail(Email);
        if (!isEmailValid) {
            return res.status(400).json({ error: "Email does not exist" });
        }
        if (VendorContactNumber && !/^\d{10}$/.test(VendorContactNumber)) {
            return res.status(400).json({ error: "Phone number must be exactly 10 digits." });
        }
        
        // Hash the password if it is being updated
        let updatedData = { FullName, VendorAdd,Email,Password,VendorContactNumber};
        if (Password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.Password = await bcrypt.hash(Password, salt);
        }

      
        const result = await RentalVendor.update(updatedData, { where: { VendorID:id } });

        return result[0]
            ? res.status(200).json({ message: "Updated successfully" })
            : res.status(400).json({ error: "No changes made" });


    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
        
    }
}


//---------------------------------Delete-Profile------------------------------

export const DeleteProfile =async(req,res,next)=>{

    let id=req.params.id;
    const user = await RentalVendor.findByPk(id);
    if (!user) {
        return res.status(404).json({ error: "User ID not found" });
    }

    await RentalVendor.destroy({where:{VendorID : id}})
    .then(result=>{
        return res.status(201).json({message :"User Deleted successfully",result});
    })
    .catch(err=>{
        console.log(err);
        return res.status(404).json({error :"Internal Server Error"});
    });


}