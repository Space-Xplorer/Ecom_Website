import mongoose from "mongoose";

let paymentSchema=mongoose.Schema(
    {
    products:[
        {
        type:mongoose.ObjectId,
        ref:"productModel",
        }
    ],
    buyer:{
        type:mongoose.ObjectId,
        ref:"users",
    },
    razorpay_order_id: {
        type:String,
    }, 
    razorpay_payment_id :{
        type:String
    },
    status:{
        type:String,
        default:"Not processed",
        enum:["Not processed","Processing","Shipped","Delivered","Cancelled"]
    }
},{timeStamps:true});

export default mongoose.model('paymentModel',paymentSchema); 