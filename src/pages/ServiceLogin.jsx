import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { serviceLoginApi } from '../services/allApi'

function ServiceLogin() {

  const [serviceDetails, setServiceDetails] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const handleServiceLogin = async () => {
    const { email, password } = serviceDetails
    if (!email || !password) {
      alert('please fill the form completely')
    }
    else {
      const result = await serviceLoginApi(serviceDetails)
      console.log(result);
      if (result.status == 200) {
        sessionStorage.setItem("existingServices", JSON.stringify(result.data.existingServices))
        sessionStorage.setItem("token", result.data.token)

        setServiceDetails({
          email: "",
          password: ""
        })
 
        sessionStorage.setItem("token", result.data.token);

        const serviceDetails = JSON.parse(sessionStorage.getItem("existingServices"));
        if (
          serviceDetails &&
          serviceDetails.phone &&
          serviceDetails.address &&
          serviceDetails.service &&
          serviceDetails.license &&
          serviceDetails.imageOne &&
          serviceDetails.imageTwo &&
          serviceDetails.imageThree &&
          serviceDetails.location.latitude &&
          serviceDetails.location.longitude 

        ) {
          if(serviceDetails.status=="Accepted"){
            navigate("/servicehome");
          }else if(serviceDetails.status=="Rejected"){
            alert('Sorry! Your application is rejected. Please contact Admin via akshai@gmail.com')
sessionStorage.clear()
          }else{
            alert("Your aplication under reviewing")
            sessionStorage.clear()

          }
          
        } else {
          navigate("/registration");
        }

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
          <h2 className="text-center mb-4">Service Login</h2>
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
                value={serviceDetails.email}
                onChange={(e) => setServiceDetails({ ...serviceDetails, email: e.target.value })}
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
                value={serviceDetails.password}
                onChange={(e) => setServiceDetails({ ...serviceDetails, password: e.target.value })}
              />
            </div>
            <button onClick={handleServiceLogin} type="button" className="btn btn-primary w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account? <Link to={'/service-register'}>Register</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default ServiceLogin