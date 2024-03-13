import mongoose from "mongoose";



export const connectTodb = async()=>{
    try{ 
        const db = await mongoose.connect(
          "mongodb://127.0.0.1:27017/myDataBase"
        );
        console.log("database connected!")
        
        
    }
    catch(error){
        console.log("error message",error)
        // throw new Error("Error connecting to Database!")
    }
}