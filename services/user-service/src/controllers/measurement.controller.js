import Measurement from "../models/Measurement";
import User from "../models/User.js";
import { validationResult } from "express-validator";

// create user's measurements

export const createOrUpdateMeasurement = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
    const userId=req.user.id;
    const measurementData={...req.body,userId};
    const existingMeasurement=await Measurement.findOne({userId,isActive:true});
    if(existingMeasurement){
      Object.assign(existingMeasurement,measurementData);
      await existingMeasurement.save();
      return res.status(200).json({ message: "Measurement updated successfully", measurement: existingMeasurement });
    }
    else{
        const newMeasurement=new Measurement(measurementData);
        await newMeasurement.save();
        return res.status(201).json({ message: "Measurement created successfully", measurement: newMeasurement });
    }
  }
  catch(error){
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
