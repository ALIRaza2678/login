const mongoose=require("mongoose")

const connectDb=async()=>{
    try{
await mongoose.connect("mongodb://localhost:27017/react23");
console.log("Mongodb connected Successfully!")
    }
    catch(err){
        console.log("Error connecting to MongoDB",err)
    }
}
module.exports=connectDb;