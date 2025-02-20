import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import { adminLoginApi } from '../services/allApi';



function LoginAdmin() {

  
  const navigate=useNavigate()
  const [adminDetails,setAdminDetails] = useState({
    email:"",
    password:""
  })
  console.log(adminDetails);
  const adminHandleLogin=async ()=>{
      const {email,password} = adminDetails
      if(!email||!password){
        alert('please fill the form completely')
      }
      else{
        const result = await adminLoginApi(adminDetails)
        console.log(result);
        if(result.status==200){
          sessionStorage.setItem("existingAdmin",JSON.stringify(result.data.existingAdmin))
          sessionStorage.setItem("token",result.data.token)
  
         
          setAdminDetails({
            email:"",
            password:""
          })
          setTimeout(()=>{
            navigate("/admin")
          },1000)
        }
        else if(result.status==406){
          alert(result.response.status)
        }
        else{
          alert('something went wrong')
        }
      }
    }
  return (
    <div
        className="login-container d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage: "url('https://t3.ftcdn.net/jpg/09/50/94/08/360_F_950940837_cRZmiO5L2TjHLIzAD7JJVvKcTiOYnbXC.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">Admin Login</h2>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="username" className="form-label fw-bold">
                Email
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter your email"
                required
                value={adminDetails.email}
                onChange={(e)=>setAdminDetails({...adminDetails,email:e.target.value})}
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Enter your password"
                required
                value={adminDetails.password}
                onChange={(e)=>setAdminDetails({...adminDetails,password:e.target.value})}
              />
            </div>
            <button onClick={adminHandleLogin} type="button" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
  )
}

export default LoginAdmin