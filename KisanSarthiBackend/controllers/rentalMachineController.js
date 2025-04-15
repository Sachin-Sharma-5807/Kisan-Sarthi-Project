
import { validationResult } from "express-validator";
import RentalMachine from "../models/RentalMachine.js"; // Ensure correct path


export const AddOldMachine = async (req, res) => {
    try {
      // Validate input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
      }
  
      // Check file upload
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ success: false, message: "At least one image is required!" });
      }
  
      // Get image paths
      const imagePaths = req.files.map(file => file.path);
  
      // Create new rental machine record
      const newRentalMachine = await RentalMachine.create({
        VendorID: req.body.VendorID,
        MachineName: req.body.MachineName,
        MachineType: req.body.MachineType,
        CompanyName: req.body.CompanyName,
        RentalPricePerDay: req.body.RentalPricePerDay,
        MachineDescription: req.body.MachineDescription,
        MachineImages: imagePaths,
        AvailabilityStatus: req.body.AvailabilityStatus,
      });
  
      res.status(201).json({ success: true, data: newRentalMachine });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
  //----------------------------------Get-old-Machine-----------------------------------

  export const GetOldMachine=async(req,res,next)=>{

    try{
      let id=req.params.id;
  
      let getMachine=await RentalMachine.findByPk(id);
  
      if(!getMachine){
        return res.status(404).json({message:"Machine not found...😢"});
    }
    return res.status(200).json({getMachine});
  
  
    }
    catch(err){
      console.log(err);
      return req.status(500).json({error:"Internal Server error"});
  
    }

  }

  //----------------------------------Update-New-Machine---------------------------------------

export const UpdateOldMachine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { MachineName, MachineType, CompanyName, RentalPricePerDay, MachineDescription, AvailabilityStatus } = req.body;

    const updateMachine = await RentalMachine.findByPk(id);
    if (!updateMachine) {
      return res.status(404).json({ message: "Machine not found...😢" });
    }

    let updatedData = { MachineName, MachineType, CompanyName, RentalPricePerDay, MachineDescription, AvailabilityStatus };

    if (req.files && req.files.length > 0) {
      let imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));
      updatedData.MachineImages = imagePaths;

      if (updateMachine.MachineImages) {
        JSON.parse(updateMachine.MachineImages).forEach((oldImagePath) => {
          const fullPath = path.join(__dirname, "../", oldImagePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        });
      }
    }

    const result = await RentalMachine.update(updatedData, { where: { RentalMachineID: id } });
    return result[0]
      ? res.status(200).json({ message: "Machine Details Updated Successfully" })
      : res.status(400).json({ error: "No Changes Made" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//------------------------------------------Delete-New-Machine-------------------------------

export const DeleteOldMachine=async(req,res,next)=>{

  let id=req.params.id;

  await RentalMachine.destroy({where:{RentalMachineID : id}})
   .then(result=>{
       return res.status(201).json({message :"Machine Deleted successfully",result});
   })
   .catch(err=>{
       console.log(err);
       return res.status(404).json({error :"Internal Server Error"});
   });
}

//------------------------------------Get-All-Old-Machines---------------------------------------

// export const GetAllOldMachine = async (req, res, next) => {
//   try {
//     const getAllMachines = await RentalMachine.findAll();
//     return res.status(200).json({ data: getAllMachines });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };



export const GetAllOldMachine = async (req, res, next) => {
  try {
    const getAllMachines = await RentalMachine.findAll();
    const machinesWithMainImage = getAllMachines.map(machine => {
      const m = machine.toJSON();
      if (Array.isArray(m.MachineImages) && m.MachineImages.length > 0) {
        // Convert backslashes to forward slashes
        m.MachineImage = m.MachineImages[0].replace(/\\/g, "/");
        // Optionally, add your base URL if needed:
        m.MachineImage = `${process.env.BASE_URL || "http://localhost:3000"}/${m.MachineImage}`;
      } else {
        m.MachineImage = "/default-machine.jpg";
      }
      return m;
    });
    return res.status(200).json({ data: machinesWithMainImage });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


