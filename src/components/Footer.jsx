import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer className="bg-light py-4 " style={{height:'70px'}}>
      <div className="container">
        <div className="row text-center text-md-start">
          
          {/* About Us Section */}
          <div className="col-md-4 mb-3 mb-md-0 d-flex flex-column align-items-center">
            <h4 className="fw-bold text-center mb-3">About Us</h4>
            <p className="text-center">
              E-Workshop helps you find workshops and service centers based on
              your location. Perfect for emergencies!
            </p>
          </div>

          {/* Navigation Links Section */}
          <div className="col-md-4 mb-3 mb-md-0 d-flex flex-column align-items-center">
            <h4 className="fw-bold text-center mb-3">Navigation</h4>
            <ul className="list-unstyled text-center">
              <li className="mb-2">
                <Link to="/" className="text-decoration-none text-dark">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/login" className="text-decoration-none text-dark">
                  Login
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-decoration-none text-dark">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-decoration-none text-dark">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Links Section */}
          <div className="col-md-4 d-flex flex-column align-items-center">
            <h4 className="fw-bold text-center mb-3">Follow Us</h4>
            <div className="d-flex justify-content-center">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark me-3"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} size="2x" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark me-3"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faXTwitter} size="2x" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark me-3"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-dark"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
