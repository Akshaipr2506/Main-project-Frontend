import React, { useState } from 'react'
import { serviceRegisterApi } from '../services/allApi';
import { useNavigate } from 'react-router-dom';

function ServiceRegister() {

  const navigate=useNavigate()
  const [serviceDetails, setServiceDetails] = useState({
    ownername: "",
    email: "",
    password: "",
    shopname: ""
  })
  console.log(serviceDetails);

  const handleServiceRegister = async () => {
    const { ownername, email, password, shopname } = serviceDetails
    if (!ownername || !email || !password || !shopname) {
      alert('Fill the form completely')
    }
    else {
      const result = await serviceRegisterApi(serviceDetails)
      console.log(result.status);
      if (result.status == 200) {
        alert("Registration successfull")
        setServiceDetails({
          ownername: "",
          email: "",
          password: "",
          shopname
        })
        navigate("/servicelogin")
      }

      else if (result.status == 406) {
        alert("User alraedy exist")
      }
      else {
        alert("Something went wrong")
      }
    }
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/024/614/272/small_2x/nighttime-garage-service-men-repairing-metal-machinery-for-transportation-industry-generated-by-ai-free-photo.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="card shadow-lg p-4"
        style={{
          width: '100%',
          maxWidth: '600px',
          borderRadius: '15px',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <h2 className="text-center fw-bold mb-4">Service Center Registration</h2>
        <form>

          <div className="form-group mb-3">
            <label htmlFor="ownername" className="form-label fw-bold">
              Owner Name
            </label>
            <input
              type="text"
              id="ownername"
              className="form-control"
              placeholder="Enter your name"
              required
              value={serviceDetails.ownername}
              onChange={(e) => setServiceDetails({ ...serviceDetails, ownername: e.target.value })}
            />
          </div>
          {/* Email */}
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              required
              value={serviceDetails.email}
              onChange={(e) => setServiceDetails({ ...serviceDetails, email: e.target.value })}
            />
          </div>

          {/* Password */}
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
          <div className="form-group mb-3">
            <label htmlFor="shopname" className="form-label fw-bold">
              Shop Name
            </label>
            <input
              type="text"
              id="shopname"
              className="form-control"
              placeholder="Enter your shop name"
              required
              value={serviceDetails.shopname}
              onChange={(e) => setServiceDetails({ ...serviceDetails, shopname: e.target.value })}
            />
          </div>


          {/* Submit Button */}
          <button
            onClick={handleServiceRegister}
            type="button"
            className="btn btn-primary w-100 fw-bold mt-3"
            style={{
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              fontSize: '16px',
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  )
}

export default ServiceRegister