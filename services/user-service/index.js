import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const mongoDB_URL = process.env.MONGODB_URL;

mongoose.connect(mongoDB_URL, []);
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection established successfully");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
