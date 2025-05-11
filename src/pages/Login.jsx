import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginApi } from '../services/allApi';

function Login() {

  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: ""
  })
  console.log(userDetails);


  const userHandleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      alert('please fill the form completely')
    }
    else {
      const result = await userLoginApi(userDetails)
      console.log(result);
      if (result.status == 200) {
        sessionStorage.setItem("existingUsers", JSON.stringify(result.data.existingUsers))
        sessionStorage.setItem("token", result.data.token)

        setUserDetails({
          email: "",
          password: ""
        })
        setTimeout(() => {
          navigate("/userhome")
        }, 2000)
      }
      else if (result.status == 406) {
        alert(result.response.status)
      }
      else {
        alert('something went wrong')
      }
    }
  }
  return (
    <>
      <div
        className="login-container d-flex justify-content-center align-items-center vh-100"
        style={{
          backgroundImage: "url('https://t3.ftcdn.net/jpg/09/50/94/08/360_F_950940837_cRZmiO5L2TjHLIzAD7JJVvKcTiOYnbXC.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <button className='btn btn-primary' onClick={() => navigate('/')}>Home</button>
        </div>

        <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
          <h2 className="text-center mb-4">User Login</h2>
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
                value={userDetails.email}
                onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
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
                value={userDetails.password}
                onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              />
            </div>
            <button type="button" className="btn btn-primary w-100" onClick={userHandleLogin}>
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to={'/user-register'}>Register</Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
