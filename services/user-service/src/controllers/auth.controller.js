import express from "express";
import User from "../models/User.js"; 
import bcrypt from "bcrypt";

export const registerUser=async (req,res)=>{
    try{
        const {name,email,phone,password,gender,dateOfBirth,address}=req.body;
        const existingUser=await User.findOne({$or:[{email},{phone}]});
        if(existingUser){
            return res.status(400).json({message:"User with this email or phone already exists"});
        }

        const user=new User({
            name,
            email,
            phone,
            password,
            gender,
            dateOfBirth,
            address
        })
        
        await user.save();
        return res.status(201).json({message:"User registered successfully",user:{
            id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            gender:user.gender,
            dateOfBirth:user.dateOfBirth,
            address:user.address
        }});
    }
    catch(error){
        return res.status(500).json({message:"Internal server error",error:error.message});
    }
}