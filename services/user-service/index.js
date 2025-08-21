import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const mongoDB_URL = process.env.MONGODB_URL;
const PORT=process.env.PORT||3000;

if(!mongoDB_URL){
    console.error("Error: MONGODB_URL is not defined in environment variables.");
    process.exit(1);
}

async function startServer(){
    try{
        await mongoose.connect(mongoDB_URL,[]);
        console.log("MongoDB connection established successfully");
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch(error){
        console.log("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}
startServer();