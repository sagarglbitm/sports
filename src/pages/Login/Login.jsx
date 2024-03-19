import React, { useEffect, useState } from "react";
import "../Login/Login.css";
import { axios } from "react";
import { navigate } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [errors, setErrors] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate()
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
 
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
 
  const isAccessTokenExpired = () => {
    return true;
  };
  // const accessToken = localStorage.getItem('accessToken');
  // if (accessToken) {
  //   return true; // No token available, consider it expired
  // }
 
  //   // // Decode the JWT token to get expiration time
  //   // const decodedToken = JSON.parse(atob(accessToken.split('.')[1]));
  //   // console.log(decodedToken);
  //   // const expirationTime = decodedToken.exp * 5000; // Convert seconds to milliseconds
 
  //   // // Check if the token is expired
  //   // return expirationTime < Date.now();
  //   return true;
  // };
 
  // // useEffect to periodically check and refresh the token
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
 
  const handleSignIn = () => {
    console.log(email, password);
    const errors = {};
    if (!email) {
      errors.email = "Email is required.";
    } else if (!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
      errors.email = "Enter valid email address";
    }
 
    if (!password) {
      errors.password = "Password is required.";
    }
 
    setErrors(errors);
 
    const data = {
      email: email,
      password: password,
    };
    fetch("http://localhost:8081/api/v1/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log("sagar",response.status);
        // if (!response.ok) {
        //   throw new Error("Error occurred during sign-in.");
        //   toast.error("Error occurred during sign-in")
        // }
         if(response.status===401){
         toast.error("invalid crenditals")
        }
        // Parse the response as JSON
        return response.json();
      })
      .then((data) => {
        // Handle the response from your API
        console.log("success");
        toast.success("Login Successfull")
        if(data.role=="ADMIN")
        {
          navigate("/Admin")
        }
        else{
          navigate("/")
        }
        
        console.log("dffffffffffffffffffffffffffffff",data);
        // const { accessToken, refreshToken, user } = data;
 
        // Store tokens in localStorage or a secure storage solution
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("name", data.name)
        localStorage.setItem("sapid", data.sapid)

        // localStorage.setItem('user', JSON.stringify(user));
        // const refreshToken = data.refresh_token;
 
        // const accessToken = data.access_token;
        // ... (do something with the tokens, e.g., store them in local storage, etc.)
      })
      .catch((error) => {
        // Handle error
        console.error("Sign-in  1error:", error);
        if (error.response === 401) {
          toast.error("Invalid Credentials")
        }
        // You can set an error state here to display an error message to the user
      });
  };
  const handlesignup = () => {
    navigate("/SignUp")
  }
 
  return (
    <div className="form">
      <div className="heading">Login</div>
      <br></br>
      <div className="flex-column">
        <label>
          Email <span className="required">*</span>
        </label>
      </div>
      <div className="inputForm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 32 32"
          height="20"
        >
          <g data-name="Layer 3" id="Layer_3">
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
          </g>
        </svg>
        <input
          className="input"
          type="email"
          name="email"
          placeholder="Enter Your Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      {errors.email && <p className="error">{errors.email}</p>}
 
      <div className="flex-column">
        <label>
          Password <span className="required">*</span>
        </label>
      </div>
      <div className="inputForm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="-64 0 512 512"
          height="20"
        >
          <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
          <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
        </svg>
        <input
          className="input"
          type="password"
          name="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      {errors.password && <p className="error">{errors.password}</p>}
      <div>
        <button className="button-submit" onClick={handleSignIn}>
          Sign In
        </button>
 
        <p className="p">
          Don't have an account? <span className="span" onClick={handlesignup}>Sign Up</span>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};
 
export default LoginForm;
 