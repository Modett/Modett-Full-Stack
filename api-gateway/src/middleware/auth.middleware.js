import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../../../services/user-service/.env" });

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }
  const token=authHeader.split(" ")[1];
  try{
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
  }
  catch(error){
    res.status(401).json({message:"Token is not valid"});
  }
};

export default auth;
