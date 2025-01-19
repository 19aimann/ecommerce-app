import React,{useState} from 'react'
import Layout from "./../Components/Layout";
import toast from 'react-hot-toast';
import {useNavigate,useLocation} from "react-router-dom";
import axios from "axios";
import { useAuth } from '../context/auth';
import "../Styles/AuthStyles.css";
const Login = () => {
const[email,setEmail]=useState("");
const[password,setPassword]=useState("");
const [auth,setAuth]=useAuth();
const navigate =useNavigate();
const location=useLocation();
const handleSubmit= async (e)=>{
  e.preventDefault();
  try {
    const res = await axios.post('/api/v1/auth/login',{email,password});
  if(res && res.data.success){
    toast.success(res.data && res.data.message);
  setAuth({
    ...auth,
    user:res.data.user,
    token:res.data.token,
  });
  localStorage.setItem('auth',JSON.stringify(res.data))
    navigate(location.state || "/");
  }else{
  toast.error(res.data.message);
  }
  } 
  catch (error) {
    console.log(error);
    toast.error('Something went wrong');
  }
  };
  
  
  return (
    <Layout title={"Login-E commerce app"}>
    <div className='form-container'>
      <h1>Login Page</h1>
     <form onSubmit={handleSubmit}>
    
    
      <div className="mb-3">
        
        <input type="email" 
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="form-control"
         id="exampleInputEmail1" placeholder=' Enter Your Email' required />
    
      </div>
    
      
      
      <div className="mb-3">
        
        <input type="password" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="form-control"
         id="exampleInputPassword1"  placeholder=' Enter Your password' required/>
      </div>
    
    
    
      <button type="submit" className=" mb-3 btn btn-primary"> LOGIN</button>
      <div className="mb-3">
      <button type="button" className="btn btn-success " onClick={()=>{navigate('/forgot-password')}}> Forgot Password</button>
      </div>
    </form>
    
    </div>
    
        </Layout>
  )
}

export default Login
