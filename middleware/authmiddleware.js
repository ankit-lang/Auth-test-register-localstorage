import jwt from "jsonwebtoken"
import userModel from "../model/userModel"
export const requireSignin = async(req,res,next) =>{
    try {
        const decode  =await jwt.verify(req.headers.autherization,process.env.JWT_SECRET)
        req.user = decode;
        next()
    } catch (error) {
        console.log(error)
        
        
    }
}

export const isAdmin =async (req,res,next) =>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role !==1){
            return res.status(401).json({
                success: false,
                message:"UnAuthorized access"
            })
        }
        else{
            next()
        }
        
    } catch (error) {
        console.log(error)

        
    }

}