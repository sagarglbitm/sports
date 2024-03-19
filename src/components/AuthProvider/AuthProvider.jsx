import React, { ReactNode, createContext, useState ,useEffect} from 'react';
 
 
 
export const AuthContext = createContext({
 
  
 
});
 
 
const AuthProvider = ({ children }) => {
 
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const data = {
      token: refreshToken,
    };
 
    try {
      const response = await fetch(
        "http://localhost:8081/api/v1/auth/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
 
      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        const accessToken = responseData.accessToken; // Access accessToken from parsed response
        console.log("refresh token refreshed");
        localStorage.setItem("accessToken", accessToken); // Store new accessToken
        return true;
      } else {
        console.log("error");
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (isAccessTokenExpired()) {
        await refreshAccessToken();
      }
    };
 
    // Check and refresh token every 15 seconds (adjust as needed)
    const intervalId = setInterval(checkAndRefreshToken, 15 * 1000);
 
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
 
  const isAccessTokenExpired = () => {
    return true;
  };
 
 
  
 
 
 
 
 
  return (
 
    <AuthContext.Provider>
 
      {children}
 
    </AuthContext.Provider>
 
  );
 
};
 
 
export default AuthProvider;