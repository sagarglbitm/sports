import React, { useState } from 'react';
import './SignUp.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';



const SignUp = () => {
  
  const [errors,setErrors]=useState({})
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [sapId, setSapId] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate()
 
  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };
  const handleSapIdChange = (event) => {
    setSapId(event.target.value);
   
  };
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
 
 const handleSignUp = () => {
    const errors={};
 
    if (!name) {
      errors.name = "Name is required.";
    }
    else if(! /^[a-zA-Z\s'-]+$/.test(name)){
      errors.name = "Name should contain letter and spaces";
    }
 
    if (!sapId) {
      errors.sapId = "Sap Id is required.";
    }else if(!/^[0-9]{8}$/.test(sapId)){
      errors.sapId="Please enter a valid Sap Id."
    }
 
    if (!email) {
      errors.email = "Email is required.";
    }else if(!/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)){
      errors.email="Enter valid email address"
    }
 
    if (!password) {
      errors.password = "Password is required.";
    }else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password)){
      errors.password="Enter valid password"
    }
 
    if (!confirmPassword) {
      errors.confirmPassword = "Confirm Password is required.";
    }else if(password !== confirmPassword){
      errors.confirmPassword="Password do not match"
    }
 
    if (Object.keys(errors).length === 0) {
      // If there are no errors, create an object with the data to be sent
      const data = {
        sapid: sapId,
        name: name,
        email: email,
        password: password,
      };
 
      // Make the HTTP POST request to the server or API
      fetch('http://localhost:8081/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            // throw new Error('Error occurred during signup.');
            toast.error('User Already Exist', {
             position: "top-center",
              autoClose: 3000,
          })
          }
          else{
            console.log("register successfull");
            toast.success('Registration successful!', {
            position: "top-center",
              autoClose: 3000,
          }
          )
          navigate("/Login")
        }
          // Handle successful response
          // e.g., show success message, redirect to another page, etc.
        })
        .catch((error) => {
          // Handle error
          console.error('Signup error:', error);
          // You can set an error state here to display an error message to the user
        });
    }
 
   
    setErrors(errors);
 
   
  }
 
 
  return (
    <div className="form">
      <div className="flex-column">
        <label>Sap Id <span className="required">*</span></label>
      </div>
      <div className="inputForm">
        <input
          className="input"
          type="text"
          name="sapId"
          placeholder="Enter Your Sap Id"
          value={sapId}
          onChange={handleSapIdChange}
           required
        />
      </div>
      {errors.sapId && <p className="error">{errors.sapId}</p>}
 
      <div className="flex-column">
        <label>Name <span className="required">*</span></label>
      </div>
      <div className="inputForm">
        <input
          className="input"
          type="text"
          name="name"
          placeholder="Enter Your Name"
          value={name}
          onChange={handleNameChange}
          required
        />
       
      </div>
      {errors.name && <p className="error">{errors.name}</p>}
     
      <div></div>
 
      <div className="flex-column">
        <label>Email <span className="required">*</span></label>
      </div>
      <div className="inputForm">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
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
        <label>Password <span className="required">*</span></label>
      </div>
      <div className="inputForm">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>  
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
 
      <div className="flex-column">
        <label>Confirm Password <span className="required">*</span></label>
      </div>
      <div className="inputForm">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>  
        <input
          className="input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Your Password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
      </div>
      {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
 
      <div className="btn-container">
        <button className="button-submit" onClick={handleSignUp}>Register</button>
       
      </div>
      <ToastContainer />
     
    </div>
  );
};
 
export default SignUp;