import mongoose, { mongo } from "mongoose";
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{ 
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    isValid:{
        type:Boolean,
        default:1
    },
    uniqueString:{
        type:String,
        required:true
    },
    cart:{
        type:Array,
        default:[],
        required:true
    }
},{timestamps:true})
//timestamps whenever new user is created the time at which it was created is also stored
export default mongoose.model('users',userSchema)