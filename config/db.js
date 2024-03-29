import mongoose from "mongoose"

const connectDB = async() =>{

    try {
        const conn =  await mongoose.connect(process.env.MONGO_URI)
        console.log(`Conneceted to Data Base ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error occured in mongodb ${error}`.bgRed.white)
        
    }
}
export  default connectDB