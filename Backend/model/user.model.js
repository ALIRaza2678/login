const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    age:{type:Number},
    code:{type:Number},
    isVerified:{type:Boolean,default:false}
},
{timestamps:true}
)

module.exports=mongoose.model("User",userSchema)