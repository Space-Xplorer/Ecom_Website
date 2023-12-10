import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import paymentModel from '../models/paymentModel.js'
import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import { UniqueString } from "unique-string-generator";
import nodemailer from 'nodemailer';

const sendConformationMail =async (email,uniqueString)=>{
  const transport = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port: 465,
    secure:true,
    auth:{
      user:process.env.MAILUSER,
      pass: process.env.MAILPASS
    }
  });

  const sender = "Artisans of Telangana"
  const href = `https://good-teal-caterpillar-shoe.cyclic.cloud/verify/${uniqueString}`
  const mailOptions = {
    from: sender,
    to: email,
    subject: "Email Confirmation",
    html: `press <a href=${href}>Here</a> to verify your email. Team Artisans of Telangana with ❤️`
  };
  await new Promise((resolve, reject) => {
    transport.sendMail(mailData, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log("Message Sent");
      }
    });
  });

}

export const registerController = async (request, response) => {
  try {
    const { name, email, password, phone, address, answer } = request.body;
    if (!name)
      return request.send({ success: false, message: "Name is required" });
    if (!email)
      return request.send({ success: false, message: "E-mail is required" });
    if (!password)
      return request.send({ success: false, message: "Password is required" });
    if (!phone)
      return request.send({ success: false, message: "Phone is required" });
    if (!address)
      return request.send({ success: false, message: "Address is required" });
    if (!answer)  
      return request.send({ success: false, message: "Answer is required" });

    // Check user
    const existingUser = await userModel.findOne({ email });
    //Existing user
    if (existingUser) {
      return response.status(200).send({
        success: false,
        message: "User already registered, please login",
      });
    }    

    // Register user
    const hashedPassword = await hashPassword(password);
    const uniqueString = UniqueString();
    const user = await new userModel({ 
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
      uniqueString,
      isValid:1
    }).save();
    // sendConformationMail(email,uniqueString);
    response.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    }); 
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(200).send({
        success: false,
        message: "Invalid E-mail or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user)
      return response.status(200).send({
        success: false,
        message: "User is not registered",
      });
    const match = await comparePassword(password, user.password);

    if (!match) {
      return response.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const isValid = user.isValid;
    if(!isValid){
      return response.status(200).send({
        success: false,
        message: "Email not verified, kindly check your mail",
      });
    }
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_KEY, {
      expiresIn: "7d",
    });
    response;
    response.status(200).send({
      success: true,
      message: "Login successful",
      user:{
        _id: user._id,
        name:user.name,
        email:user.email,
        phone:user.phone,
        address:user.address,
        role:user.role,
        password:password,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};
export const testController= async(req,res)=>{
  try{
  res.send("protected route");
  }
  catch(error){
    console.log(error);
    res.send({error});
  }
};
export const forgotPasswordController = async (request, response) => {
  const { email, answer, newPassword } = request.body;
  let user = await userModel.findOne({ email });
  if (user === null) {
    return response.status(200).send({
      success: false,
      message: "User not found",
    });
  }   
  if (user.answer === answer) {
    const hashedPassword = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    return response.status(200).send({
      success: true,
      message: "Password changed successfully",
    });
  } else {
    return response.status(200).send({
      success: false,
      message: "Given details are invalid, try again",
    });
  }
};

export const userUpdateController = async (request, response) => {
  try {
    const { name, email, password, phone, address } = request.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return response.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    if(password && password.length<6)
    {
      res.json({error:'Password is Required and 6 characters long'})
    }
    const hPassword = await hashPassword(password);
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      {
        name:name || user.name,
        email: email || user.email,
        password: hPassword,
        phone:phone || user.phone,
        address:address || user.address,
      },
      { new: true }
    );
    return response.status(201).send({
      success: true,
      message: "User updated successfully",
      updatedUser,
    });
  } catch (error) {
    return response.status(400).send({
      success: false,
      message: "Error in updating user profile",
      error,
    });
  }
};

export const getOrdersController = async (request, response) => {
  try {
    const orders = await paymentModel
      .find({ buyer: request.user._id })
      .populate("products","-photo")
      .populate("buyer","name");  
      response.status(201).send({success:true,orders});
  } catch (error) {
    return response.status(400).send({
      success: false,
      message: "Error in fetching user orders",
      error,
    }); 
  }
};

export const getAllOrdersController = async (request, response) => {
  try {
    const orders = await paymentModel
      .find({})
      .populate({
        path: 'products',
        model: 'productModel'})
      .populate("buyer").sort({createdAt:"-1"})
      return response.status(201).send({success:true,orders});
  } catch (error) {
    return response.status(400).send({
      success: false,
      message: "Error in fetching user orders",
      error,
    });
  }
};

export const orderStatusController = async (request, response) => {
  try {
    const {orderId} = request.params; 
    const {status} = request.body;
    console.log(status);
    const order = await paymentModel.findByIdAndUpdate(status,{orderId},{new:true})
    return response.status(200).send({success:true,order,status});
  } catch (error) {
    return response.status(400).send({
      success: false,
      message: "Error in updating order status",
      error,
    });
  }
}

export const getAllUsersController = async (request, response) => {
  try {
    const users = await userModel.find({});
    response.status(201).send({success:true,users});
  } catch (error) {
    return response.status(400).send({
      success: false,
      message: "Error in fetching users",
      error,
    });
  }
}

export const emailVerificationController = async(req,res)=>{
  const {unqStr} = req.params;
  const user = await userModel.findOne({uniqueString:unqStr})
  if(user){
    user.isValid = true;
    await user.save();
    res.send({
      success:true,
      message:"Email verified successfully"
    })
  }
  else{
    res.json("User not found");
  }
}
