import express from "express";
import User from "../models/user.model.js"; 
import bcrypt from "bcrypt";

export const registerUser=async (req,res)=>{
    try{
        const {name,email,phone,password,gender,dateOfBirth,address}=req.body;
        const existingUser=await User.findOne({$or:[{email},{phone}]});
        if(existingUser){
            return res.status(400).json({message:"User with this email or phone already exists"});
        }
        
    }
}