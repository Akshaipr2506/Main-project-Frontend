import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userRequestApi } from '../services/allApi';



function UserRegister() {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    console.log(userDetails);

    const handleUserRegister = async () => {
        const { username, email, password, confirmPassword } = userDetails
        if (!username || !email || !password || !confirmPassword) {
            alert('Please fill the form')
            
        }
        else if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        else {
            const result = await userRequestApi(userDetails)
            console.log(result.status);
            if (result.status == 200) {
                alert("Registration successfull")
                setUserDetails({
                    username: "",
                    email: "",
                    password: ""
                })
                navigate("/login")
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
        <>
            <div
                className="register-container d-flex justify-content-center align-items-center vh-100"
                style={{
                    backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/024/614/272/small_2x/nighttime-garage-service-men-repairing-metal-machinery-for-transportation-industry-generated-by-ai-free-photo.jpg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="card p-4 shadow" style={{
                    width: '100%', maxWidth: '400px', borderRadius: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                }}>
                    <h2 className="text-center mb-4 fw-bold">Register</h2>
                    <form>
                        <div className="form-group mb-3">
                            <label htmlFor="username" className="form-label fw-bold">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="form-control"
                                placeholder="Enter your username"
                                required
                                value={userDetails.username}
                                onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
                            />
                        </div>
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
                        <div className="form-group mb-3">
                            <label htmlFor="confirmPassword" className="form-label fw-bold">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="form-control"
                                placeholder="Confirm your password"
                                required
                                value={userDetails.confirmPassword}
                                onChange={(e) => setUserDetails({ ...userDetails, confirmPassword: e.target.value })}
                            />
                        </div>
                        <button type="button" className="btn btn-primary w-100 fw-bold" onClick={handleUserRegister}>
                            Register
                        </button>
                    </form>
                    <p className="text-center mt-3 fw-bold">
                        Already have an account? <Link to={'/login'} className="fw-bold">Login</Link>
                    </p>
                </div>
            </div>

        </>
    )
}

export default UserRegister