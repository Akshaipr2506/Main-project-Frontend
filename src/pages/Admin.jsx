import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


function Admin() {

  const navigate=useNavigate()

  const handleLogout = () => {
sessionStorage.clear() // Remove location details
    navigate('/adminlogin');
  };
    return (

        <>
        <nav
        className="navbar navbar-expand-lg navbar-light bg-light shadow"
        style={{ height: '75px' }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold" style={{ fontSize: '30px' }}>
            E-Workshop
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="btn btn-primary fw-bold text-white text-decoration-none me-3"
                 onClick={handleLogout} 
                >
                  Logout
                </button>
              </li>
              {/* <li className="nav-item">
                <button
                  className="btn btn-primary fw-bold"
                  
                >
                  Register
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
        <div className='container p-5'>
            <h1 className='text-center'>Welcome Admin</h1>
            <div className='d-flex justify-content-center align-items-center mt-5'>
                <Link to={'/adminhome'}><button className='btn btn-danger me-3'>View Users</button></Link>
                <Link to={'/adminservice'}><button className='btn btn-warning'>View Service Providers</button></Link>
                
            </div>
        </div>
        </>
        
    )
}

export default Admin