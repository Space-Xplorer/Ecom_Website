import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EmailVerification = () => {
    const navigate = useNavigate();
    const params = useParams();
    const getStatus = async()=>{
        const {data} = await axios.get(`/api/v1/auth/verify/${params.uniqueString}`)
        if(data?.success){
            navigate('/login');
        }
        else navigate('/mail-verifcation-failure');
    }
    useEffect(()=>{
        getStatus();
    },[])
  return (
    <div></div>
  )
}

export default EmailVerification