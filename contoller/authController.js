import { comparePassword, hashPassword } from "../helper/authHelper.js";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken"

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //checking all fields
    
      if (!name) res.send({ message: "Name is required" });
      if (!email) res.send({ message: "email is required" });
      if (!password) res.send({ message: "password is required" });
      if (!phone) res.send({ message : "phone no is required" });
      if (!address) res.send({ message : "address is required" });
    

    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      return res.status(200).json({
        success: false,
        message: "User already registered",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    console.log("object")
    const user = await userModel
      .create({
        name,
        email,
        password: hashedPassword,
        phone,
        address,
      })
      await user.save();
      console.log("object")
   return  res.status(200).json({
      success: true,
      message: "User Registered successfully",
      user,
    });
  } catch (error) {
    console.log("error in registration");
    res.status(500).json({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

export const loginController = async(req,res) =>{
  try {
    const {email,password}  =req.body;
    if(!email && !password){
      return res.status(200).json({
        message: "Invalid email or password"
      })
    }
    //checking user
    const user =  await userModel.findOne({email})
    if(!user){
      return res.status(200).json({
        success:true,
        message:"user not found"
      })
    }
    //checking password
    const match =  await comparePassword(password,user.password);
    if(!match){
      return res.status(200).json({
        success:false,
        message: "Invalid password"
      })
    }

    //generating token
    const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{
      expiresIn:"7d"
    })

    res.status(200).json({
      success:true,
      message:"login Successful",
      token,
      user:{
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address
      }

    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      success : false,
      message:"error in login",
      error
    })
    
  }
}