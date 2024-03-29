import React from 'react';
import './Navbar.css'; // Import CSS file for styling
import sports from '../../Assets/sports.png'; 
import { Link, NavLink , useNavigate} from 'react-router-dom';
import { useState } from 'react';
import football from "../../Assets/football.png"
import SignUp from '../../pages/SignUp/SignUp';
import logo from "../../Assets/logo5.png"


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  
  const navigate = useNavigate();

  const handleSign =()=> {
     navigate("/SignUp")
  }
  const handleLogin =()=> {
    navigate("/Login")
 }
 const handleAdmin = ()=> {
   navigate("/Admin")
 }
 const handleLeaderB = () => {
  navigate("/LeaderBoard")
 }
 const handleLogout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('sapid')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem("name")
  window.location.reload();
  navigate('/')
  // localStorage.removeItem('name')

 }
 const accessToken = localStorage.getItem('accessToken');
 const name=localStorage.getItem('name')


 const sapid = localStorage.getItem('sapid');

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Sportathon Logo" className="logo" />
        <Link  to="/"  className="brand" > Sportath⚽️n</Link>
      </div>
      {/* <div className="navbar-right">
        <button className="btn">Login</button>
        <button className="btn">Sign Up</button>
      </div> */}
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
      <div className="navbar-right">
      <span className='profile'> { name? `Hi ,${name}`: null}</span>
        <button onClick={accessToken ? handleLogout : handleLogin} className="btn">{accessToken ? "Logout": "Login"}</button>
        {/* <Link to="/signup" className="btn">Sign Up</Link> */}
        {/* <button onClick={handleSign} className='btn'>SignUp</button> */}
        {/* <button onClick={handleAdmin} className='btn'>Admin</button> */}
        <button onClick={handleLeaderB} className='btn'>LeaderBoard</button>
      </div>

      </ul>
    </nav>
  );
}

export default Navbar;