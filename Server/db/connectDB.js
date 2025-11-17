import mongoose from 'mongoose';

async function connectDB(){
    try{
        await mongoose.connect(process.env.Mongo_URL);
        console.log("Connected to MongoDB");
    }catch(err){
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
}

export default connectDB;