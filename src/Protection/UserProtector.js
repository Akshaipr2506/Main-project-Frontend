import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const UserProtector = ({ children }) => {
    const Navigate=useNavigate()
  const isAuthenticated = sessionStorage.getItem("token");

  useEffect(() => {
    if (!isAuthenticated) {
      alert("Please log in first");
      return Navigate('/login')
    }
  }, [isAuthenticated]);

  

  return children;
};

export default UserProtector;