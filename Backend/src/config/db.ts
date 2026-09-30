import mongoose from "mongoose";

 const connectDatabase = async (): Promise<void> =>{
    try {
        const  mongoUrI = process.env.MONGO_URI;
        if(!mongoUrI) throw new Error("MONGO_URI is not Defined");
        await mongoose.connect(mongoUrI);
        console.log("Database Connected SuccessFully");
       
    } catch (error) {
         if(error instanceof Error){
            console.error("Database connection error:",error.message);
         }else{
            console.error("Database connection error",error)
         }
         process.exit(1) 
    }
}

export default connectDatabase;
