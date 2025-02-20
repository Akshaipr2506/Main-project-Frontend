/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AdminProtector = ({ children }) => {
    const Navigate=useNavigate()
  const isAuthenticated = sessionStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please log in first");
      return Navigate('/adminlogin')
    }
  }, [isAuthenticated]);

  

  return children;
};

export default AdminProtector;