import mongoose from 'mongoose';
const connectDb = async ()=>{
  try{
    await mongoose.connect(process.env.MONGO);
    console.log("MongoDB is connected!")

  }catch(err)
  {
    console.log(err)
  }
}

export default connectDb;