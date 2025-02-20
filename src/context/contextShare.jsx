import React, { createContext, useState } from 'react'
export const sendRequestContext = createContext({})
export const loginRequestContext= createContext({})

function ContextShare({children}) {
    const [sendResponse, setSendResponse] = useState("");
    const [isLogin,setIsLogin] = useState(false)

    console.log(sendResponse);
    

    return (
      <sendRequestContext.Provider value={{ sendResponse, setSendResponse }}>
      <loginRequestContext.Provider value={{isLogin,setIsLogin}}>
      {children}
      </loginRequestContext.Provider>
        
      </sendRequestContext.Provider>
    );
  };

export default ContextShare