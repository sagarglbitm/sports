import React from 'react'
import "../OurServices/Services.css"
import serviceimg from "../../Assets/pexels-pixabay-262524.jpg"

const Services = () => {
  return (
    <>
     <div className="services">
      <div className="container">
       
          <div>
          <h3>Our Services</h3>
        <p className='para'>
        Sportaton simplifies sports enrollment,
         game scheduling, and performance tracking.
          Users can easily sign up for sports activities,
           browse upcoming games, and track their performance 
           on a dynamic leaderboard. The platform fosters social
            interaction and offers robust data analytics,
             promoting sportsmanship and healthy competition among participants.</p>
          </div>
    
             <div className='imgcontainer'>
        <img className='imgservices' src={serviceimg} alt=''/>
        </div>
      </div>
     
      </div>
      
    </>
  )
}

export default Services