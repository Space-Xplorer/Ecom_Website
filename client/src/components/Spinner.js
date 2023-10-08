import React,{useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { useAuth } from '../context/auth';
function Spinner({path="login"}) {
  const [auth,setAuth] = useAuth();
    const[count,setCount]=useState(3);
    const navigate=useNavigate();
    const location=useLocation();
     useEffect(()=>{
        const interval=setInterval(()=>{
            setCount(count-1)
        },1000)
        count === 0 && navigate(`/${auth?.user?.role === 1 ? "admin-panel":path}`,{
          state:location.pathname
        })
        return ()=> clearInterval(interval)
     },[count,navigate,location,path])
  return (

    <>
   <div className="d-flex flex-column align-items-center ">

    <h1 className='Text-center'>redirecting to you in {count} second</h1>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
    </div>
    </>
  )
}

export default Spinner