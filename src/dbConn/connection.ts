import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const conn=mongoose.connection;
        conn.on("connected",()=>{
            console.log("database connected successfully");
        })
        conn.on("error",(error)=>{
            console.log("error occured after conntion data base");
            console.log(error);
            process.exit();
        })

    } catch (error) {
        console.log("error occured while trying to connect to data base");
        console.log(error);
    }
}