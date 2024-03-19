import React,{ useEffect } from 'react'
// import Button from '@mui/material/Button';
import "../LandingPage/LandingPage.css"
import Carosuel from '../../components/Carosuel/Carosuel'
import Services from '../../components/OurServices/Services'
import SwiperCarosuel from '../../components/SwiperCarosuel/SwiperCarosuel'

const LandingPage = () => {

  

  return (
    <>
    <div className="landing-page">
   
    <h1>"You were born to be a player. You were meant to be here!"</h1>
    <p>
      We're here to provide our customers with the highest quality of service.
      With our dedication to customer satisfaction, you can rest assured that
      you will have a great experience.
    </p>
    
    
  </div>
  <Carosuel />
  <Services />
  <SwiperCarosuel />
  </>
  )
}

export default LandingPage


 
    
