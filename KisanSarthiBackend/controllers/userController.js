import User from '../models/User.js';
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import SellMachine from '../models/SellNewMachine.js';
import RentalMachine from '../models/RentalMachine.js';

import { Gmail } from '../middleware/SendMail.js';
import { Template } from '../middleware/Template.js';


//---------------------------------------------REGISTER-------------------------------------------


export const Register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          error: "Validation failed",
          errors: errors.array(),
      });
  }

  try {
      const { FullName, Email, PhoneNumber, Password, Address, UserType } = req.body;

      let existingUser = await User.findOne({ where: { Email } });
      if (existingUser) {
          return res.status(400).json({ message: "This email is already registered" });
      }

      // Hash the password
      let saltKey = bcrypt.genSaltSync(10);
      let hashPassword = bcrypt.hashSync(Password, saltKey);

      // Generate OTP (6-digit code)
      const gmailService = new Gmail();
      let otpCode = gmailService.generateOtp(6);
      let otp = JSON.stringify({ code: otpCode, timestamp: Date.now() });

      console.log("Generated OTP:", otp);

      let newUser = await User.create({
          FullName,
          Email,
          PhoneNumber,
          Password: hashPassword,
          Address,
          UserType,
          otp,
      });

      // Send OTP via email
      const emailData = {
          appName: "KishanSarthi",
          email: newUser.Email,
          otp: otpCode, // Send actual OTP code
          name: newUser.FullName,
          subject: "OTP Verification",
          year: new Date().getFullYear(),
      };

      const templateData = new Template().getOtpTemplate(emailData);
      gmailService.mail(emailData, templateData);

      return res.status(201).json({
          message: "Sign-up successful. Please verify OTP.",
          user: {
              id: newUser.id,
              FullName: newUser.FullName,
              Email: newUser.Email,
              PhoneNumber: newUser.PhoneNumber,
              Address: newUser.Address,
              UserType: newUser.UserType,
          },
      });
  } catch (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyOtp = async (req, res) => {
    try {
      const { Email, otp } = req.body;
  
      if (!Email || !otp) {
        return res.status(400).json({ error: "Email and OTP are required" });
      }
  
      const user = await User.findOne({ where: { Email } });
  
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
        return res.status(400).json({ error: "Invalid OTP, please try again!" }); // ✅ Message update
      }
  
      await user.update({ otp: null });
  
      return res.status(200).json({ message: "OTP verified successfully" });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
//----------------------------------------------LOG-IN----------------------------------------------

export const LogIn=async(req,res,next)=>{

    try{
        let {email,password}=req.body;
        console.log("data in side backend : ",email,password);
        let user= await User.findOne({where:{email}});
      
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


//-------------------------------------------GetUserById---------------------------------------------

export const GetUserById=async(req,res,next)=>{

try{
    let{id}=req.params;

    const user= await User.findByPk(id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json(user);

}
catch(err){
    console.log(err);
    
    return res.status(500).json({error:"Internal Server Error"});
}

}

//------------------------------------------Update-User-------------------------------------------


export const UpdateUser = async (req, res, next) => {
    try {
        let id = req.params.id;
        let { FullName, Email, PhoneNumber, Password, Address } = req.body;

        
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User ID not found" });
        }

        // Hash the password if it is being updated
        let updatedData = { FullName, Email, PhoneNumber, Address };
        if (Password) {
            const salt = await bcrypt.genSalt(10);
            updatedData.Password = await bcrypt.hash(Password, salt);
        }

      
        const result = await User.update(updatedData, { where: { UserID:id } });

        return result[0]
            ? res.status(200).json({ message: "Updated successfully" })
            : res.status(400).json({ error: "No changes made" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

//--------------------------------------DeleteUser--------------------------------------------------



export const DeleteUser=async(req,res,next)=>{
    
        let id=req.params.id;

       await User.destroy({where:{UserID : id}})
        .then(result=>{
            return res.status(201).json({message :"User Deleted successfully",result});
        })
        .catch(err=>{
            console.log(err);
            return res.status(404).json({error :"Internal Server Error"});
        });
}

//---------------------------------------                  --------------------------------------------



// Get All  New Machines
// export const GetAllNewMachines = async (req, res) => {
//   try {
//     const machines = await SellMachine.findAll();
//     res.json(machines);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching machines" });
//   }
// };


export const GetAllNewMachines = async (req, res) => {
  try {
    const machines = await SellMachine.findAll();
    // Optionally: if you need to ensure that MachineImage has a valid URL,
    // you can convert backslashes and prepend the base URL:
    const machinesWithFixedImage = machines.map(machine => {
      const m = machine.toJSON();
      if (m.MachineImage) {
        m.MachineImage = m.MachineImage.replace(/\\/g, "/");
        m.MachineImage = `${process.env.BASE_URL || "http://localhost:3000"}/${m.MachineImage}`;
      }
      return m;
    });
    res.json(machinesWithFixedImage);
  } catch (error) {
    res.status(500).json({ message: "Error fetching machines" });
  }
};
  


// Get All  Old Machines
export const GetAllOldMachines = async (req, res) => {
    try {
      const machines = await RentalMachine.findAll();
      res.json(machines);
    } catch (error) {
      res.status(500).json({ message: "Error fetching machines" });
    }
  };
  
// Add Machine with Image Upload
export const addMachine = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.filename : null;

    const newMachine = new Machine({ name, description, price, image });
    await newMachine.save();
    
    res.status(201).json({ message: "Machine added successfully", machine: newMachine });
  } catch (error) {
    res.status(500).json({ message: "Error adding machine" });
  }
};

