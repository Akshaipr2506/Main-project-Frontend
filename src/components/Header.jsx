import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header() {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (role, action) => {
    if (action === 'register') {
      if (role === 'user') {
        navigate('/user-register');
      } else if (role === 'service-center') {
        navigate('/service-register');
      }
      setShowRegisterModal(false);
    } else if (action === 'login') {
      if (role === 'user') {
        navigate('/login');
      } else if (role === 'service-center') {
        navigate('/servicelogin');
      }
      setShowLoginModal(false);
    }
  };

  return (
    <header>
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
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="btn btn-primary fw-bold"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Register Modal */}
      {showRegisterModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Register As</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowRegisterModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>Select your role to proceed with registration:</p>
                <div className="d-flex justify-content-around">
                  <button
                    className="btn btn-outline-primary fw-bold"
                    onClick={() => handleNavigation('user', 'register')}
                  >
                    User
                  </button>
                  <button
                    className="btn btn-outline-success fw-bold"
                    onClick={() => handleNavigation('service-center', 'register')}
                  >
                    Service Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Login As</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowLoginModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center">
                <p>Select your role to proceed with login:</p>
                <div className="d-flex justify-content-around">
                  <button
                    className="btn btn-outline-primary fw-bold"
                    onClick={() => handleNavigation('user', 'login')}
                  >
                    User
                  </button>
                  <button
                    className="btn btn-outline-success fw-bold"
                    onClick={() => handleNavigation('service-center', 'login')}
                  >
                    Service Center
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
