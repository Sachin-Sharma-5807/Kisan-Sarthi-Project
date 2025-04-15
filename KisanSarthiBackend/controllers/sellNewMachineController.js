import path from "path";
import fs from "fs";
import SellMachine from "../models/SellNewMachine.js";
import { validationResult } from "express-validator";
//------------------------------------Add New Machine-------------------------------------

export const AddNewMachine = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required!" });
    }

    // Create an array of image paths with forward slashes
    const imagePaths = req.files.map((file) => file.path.replace(/\\/g, "/"));

    // Use the first image as the primary MachineImage
    const primaryImage = imagePaths[0];

    const machinePrice = parseFloat(req.body.MachinePrice);
    if (isNaN(machinePrice)) {
      return res.status(400).json({ success: false, message: "Invalid machine price" });
    }

    // Create a new machine record
    const newMachine = await SellMachine.create({
      VendorID: req.body.VendorID,
      MachineName: req.body.MachineName,
      MachineType: req.body.MachineType,
      CompanyName: req.body.CompanyName,
      MachinePrice: machinePrice,
      MachineDescription: req.body.MachineDescription,
      MachineImage: primaryImage, // Set the primary image here
      MachineImages: JSON.stringify(imagePaths),
    });

    return res.status(201).json({ success: true, data: newMachine });
  } catch (error) {
    console.error("Error in AddNewMachine:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
//------------------------------------Get New Machine-------------------------------------
export const GetNewMachine = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getMachine = await SellMachine.findByPk(id);
    if (!getMachine) {
      return res.status(404).json({ message: "Machine not found...😢" });
    }
    console.log("getMachine : ",getMachine);
    
    return res.status(200).json({ getMachine });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

//----------------------------------Update New Machine---------------------------------------
export const UpdateNewMachine = async (req, res) => {
  try {
    const { id } = req.params;
    const { MachineName, MachineType, CompanyName, MachinePrice, MachineDescription } =
      req.body;

    const UpdateMachine = await SellMachine.findByPk(id);
    if (!UpdateMachine) {
      return res.status(404).json({ message: "Machine not found...😢" });
    }

    let updatedData = { MachineName, MachineType, CompanyName, MachinePrice, MachineDescription };

    if (req.files && req.files.length > 0) {
      let imagePaths = req.files.map((file) =>
        file.path.replace(/\\/g, "/")
      );
      updatedData.MachineImages = imagePaths;

      if (UpdateMachine.MachineImages) {
        JSON.parse(UpdateMachine.MachineImages).forEach((oldImagePath) => {
          const fullPath = path.join(__dirname, "../", oldImagePath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        });
      }
    }

    const result = await SellMachine.update(updatedData, { where: { MachineID: id } });
    return result[0]
      ? res.status(200).json({ message: "Machine Details Updated Successfully" })
      : res.status(400).json({ error: "No Changes Made" });
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//------------------------------------------Delete New Machine-------------------------------
export const DeleteNewMachine = async (req, res, next) => {
  const { id } = req.params;
  await SellMachine.destroy({ where: { MachineID: id } })
    .then((result) => {
      return res.status(201).json({ message: "Machine Deleted successfully", result });
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ error: "Internal Server Error" });
    });
};

//------------------------------------Get All New Machines---------------------------------------

export const GetAllNewMachine = async (req, res, next) => {
  try {
    const vendorId = req.query.VendorID; // Expecting query parameter, e.g., ?VendorID=6
    let getAllMachines;
    if (vendorId) {
      getAllMachines = await SellMachine.findAll({
        where: { VendorID: vendorId },
        attributes: { exclude: ["MachineImage"] } // Exclude if you want to recalc this field
      });
    } else {
      getAllMachines = await SellMachine.findAll({
        attributes: { exclude: ["MachineImage"] }
      });
    }

    const machinesWithImages = getAllMachines.map((machine) => {
      let images = [];
      try {
        images = machine.MachineImages ? JSON.parse(machine.MachineImages) : [];
      } catch (error) {
        console.error("Error parsing MachineImages for machine", machine.MachineID, error);
        images = [];
      }

      
      return {
        MachineID: machine.MachineID,
        MachineName: machine.MachineName,
        MachineType: machine.MachineType,
        CompanyName: machine.CompanyName,
        MachinePrice: machine.MachinePrice,
        MachineDescription: machine.MachineDescription,
        // Removed extra spaces between newMachine and the slash
        MachineImage: images.length > 0
          ? `${req.protocol}://${req.get("host")}/uploads/newMachine/${path.basename(images[0])}`
          : null,
      };
    });


    console.log("getAll Machines: ", machinesWithImages);

    return res.status(200).json({ data: machinesWithImages });
  } catch (err) {
    console.error("Error in GetAllNewMachine:", err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

