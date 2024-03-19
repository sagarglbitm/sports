import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="rows">
          <div className="col-md-7">
            <h3 className='Abh3'>About Us</h3>
            <p className='about-text'>We're here to provide our customers with the highest quality of service.
      With our dedication to customer satisfaction, you can rest assured that
      you will have a great experience.</p>
          </div>
          <div className="col-md-6">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: info@sportswebsite.com</li>
              <li>Phone: +1234567890</li>
              <li>Address: 123 Hcl-Ground, Noida, India</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
