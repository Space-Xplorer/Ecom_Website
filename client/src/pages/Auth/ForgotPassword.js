import axios from "axios";
import { useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
//import {toast} from 'react-toastify' 
import "../../styles/AuthStyles.css";


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
   // const [auth,setAuth]=useAuth()
   // const location=useLocation();
    const handleSubmit =async (e) => {
        e.preventDefault();
       try{
          const res=await axios.post(`/api/v1/auth/forgot-password`,{
            email,
            newPassword,
            answer
        });
          if(res && res.data.success){
            toast.success(res.data && res.data.message)
           
            navigate("/login");  
          }else{
            toast.error(res.data.message)
          }
    
          }
          catch(error){
            toast.error("Something Went Wrong")
           }
       }

  return (
    <Layout title={'Forgot-Password'}>
        {/* <h1>Forgot Password</h1> */}
        <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">Reset Password</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your favourite Sport Name "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setnewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your  New Password"
              required
            />
          </div>
        
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword