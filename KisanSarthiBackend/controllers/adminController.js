import { validationResult } from "express-validator";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import ShowroomVendor from "../models/ShowroomVendor.js";
import RentalVendor from "../models/RentalVendor.js";

//---------------------------------Register-------------------------


export const Register = async (req, res) => {
    const errors = validationResult(req);
  
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Bad request", errors: errors.array() });
    }
  
    try {
      let { Email, Password } = req.body;
  
      console.log("Received Data:", req.body);
  
      let existingUser = await Admin.findOne({ where: { Email } });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
  
      console.log("Hashing password...");
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(Password, salt);
  
      console.log("Creating new admin...");
      let newUser = await Admin.create({ Email, password: hashPassword }); // Fixed "password"
  
      return res.status(201).json({ message: "Sign up success", user: newUser });
    } catch (err) {
      console.error("Registration error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
//---------------------------------Log-In------------------------------


export const LogIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      const user = await Admin.findOne({ raw: true, where: { Email: email } }); // Fixed case issue
  
      if (!user) {
        return res.status(401).json({ error: "Invalid email ID" });
      }
  
      const status = await bcrypt.compare(password, user.password); // Fixed case issue
  
      if (!status) {
        return res.status(401).json({ message: "Invalid Password" });
      }
  
      return res.status(200).json({ message: "Log-In successful", user });
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  
//---------------------------------Get-All-Users----------------------------------

export const GetAllUsers =async(req,res,next)=>{

    try {

        const GetAllUsers=await User.findAll();
        return res.status(200).json({GetAllUsers});
        
    } catch (err) {
        
        console.log(err);
        return res.status(500).json({error : "Internal Server Error"});
    
    }
}

//---------------------------------Get-All-ShoroomVendor----------------------------------

export const GetAllShowroomVendor=async (req,res,next)=>{
    try {

        const GetAllUsers=await ShowroomVendor.findAll();
        return res.status(200).json({GetAllUsers});
        
    } catch (err) {
        
        console.log(err);
        return res.status(500).json({error : "Internal Server Error"});
    
    }


}

//---------------------------------Get-All-RentalVendor----------------------------------

export const GetAllRentalVendors=async(req,res,next)=>{
      try{
   const GetAllRentalVendors=await RentalVendor.findAll();
       return res.status(200).json({GetAllRentalVendors});
      }
      catch(err){
        console.log(err);
        return res.status(500).json({error :"Internal Server Error"});
      }
}

//---------------------------------Delete-ShoroomVendor----------------------------------

export const DeleteShowroomVendor =async(req,res,next)=>{

    let id=req.params.id;
    const user = await ShowroomVendor.findByPk(id);
    if (!user) {
        return res.status(404).json({ error: "User ID not found" });
    }

    await ShowroomVendor.destroy({where:{VendorID : id}})
    .then(result=>{
        return res.status(201).json({message :"User Deleted successfully",result});
    })
    .catch(err=>{
        console.log(err);
        return res.status(404).json({error :"Internal Server Error"});
    });


}

//---------------------------------Delete-RentalVendor----------------------------------


export const DeleteRentalVendor =async(req,res,next)=>{

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