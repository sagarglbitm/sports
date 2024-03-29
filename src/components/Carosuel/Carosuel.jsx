import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carosuel.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Services from "../OurServices/Services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import cricket from "../../Assets/pexels-patrick-case-3800517.jpg"
import chess from "../../Assets/pexels-pixabay-260024.jpg"
import BasketBall from '../../Assets/pexels-img-števonka-2116469.jpg'
import tennis from '../../Assets/pexels-florian-doppler-3207474.jpg'
import football from '../../Assets/pexels-robo-michalec-12266719.jpg'
import tabletennis from '../../Assets/pexels-martina-martinez-16686174.jpg'


const Carosuel = () => {

  const [selectedSport, setSelectedSport] = useState(null);
  const navigate = useNavigate();
  // const [registrationData, setRegistrationData] = useState([]);


  // useEffect(() => {
  //   const sapid = localStorage.getItem('sapid');
  //   if (sapid) {
  //     const apiUrl = `http://localhost:8083/registrations/data/${sapid}`;
  //   console.log('111API URL:', apiUrl);
  //     fetch(apiUrl)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log("data of individual",data)
  //         setRegistrationData(data);
  //       })
  //       .catch((error) => {
  //         console.error('Registration data error:', error);
  //       });
  //   }
  // }, []);


  const [individualRegistrationData, setIndividualRegistrationData] = useState([]);
  const [teamRegistrationData, setTeamRegistrationData] = useState([]);
  const [sapId,setSapId]=useState(localStorage.getItem("sapid"));

  useEffect(() => {
    // const sapid = localStorage.getItem('sapid');
    // if (sapId) {
      const individualApiUrl = `http://localhost:8083/registrations/data/${sapId}`;
      const teamApiUrl = `http://localhost:8083/teams/captaindata/${sapId}`;

      fetch(individualApiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log("Data of individual", data);
          setIndividualRegistrationData(data.Individual_sport);
        })
        .catch((error) => {
          console.error('Individual registration data error:', error);
        });

      fetch(teamApiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log("Data of team", data);
          setTeamRegistrationData(data.Team_sport);
        })
        .catch((error) => {
          console.error('Team registration data error:', error);
        });
    // }
    // const sapId=localStorage.getItem("sapid")
  }, [sapId,individualRegistrationData,teamRegistrationData]);



  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  const handleClick = (sports) => {
    console.log("sports", sports);
    if (sports === "chess" || sports === "tabletennis" || sports === "tennis") {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");
      const athelete = {
        sapid: localStorage.getItem('sapid'),
        name: localStorage.getItem('name'),
        sport: sports
      }
      fetch("http://localhost:8083/registrations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("accessToken")}`
        },
        body: JSON.stringify(athelete),
      })

        .then(async (response) => {
          // if (!response.ok) {
          //   throw new Error("Already Registered.1");
          // }
          if (response.status === 409) {
            toast("Already Registered")
            console.log("Already Registered", response.status)
          }
          if (response.status === 401) {
            // toast("Please Login")
            console.log("Invalid Status", response.status)
          }
          if (response.status === 400) {
            toast("bad request ")
            console.log("bad request", response.status)
          }
          if (response.status === 201) {
            toast("Registeration Successfull ")
            console.log("Registeration Successfull", response.status)
          }

          // Parse the response as JSON
          return response.json();
        })
        // .then((athlete) => {
        //   // Handle the response from your API
        //   console.log("success");
        //   toast.success("Registration successful");
        //   navigate("/");
        //   console.log(athlete);
        // })
        .catch((error) => {
          console.error("Registration error:", error);
          // if (error.response && error.response.status === 409) {
          //   toast.error("Already Registered56");
          // } else {
          //   toast.error("Already Registered78");
          // }
        });




      if (accessToken) {
        const name = localStorage.getItem("name");
        const sapid = localStorage.getItem("sapid");


      } else {
        // Navigate to the login page
        navigate("/Login");
      }
    } else {
      // Check if the access token exists in localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        // Navigate to the form for other sports
        setSelectedSport(sports);
        navigate(`/form/${sports}`);
      } else {
        // Navigate to the login page
        navigate("/Login");
      }
    }
  };

  // const isSportRegistered = (sport) => {
  //   return (
  //     registrationData &&
  //     registrationData.Individual_sport &&
  //     // registrationData.Team_sport&&
  //     // registrationData.Team_sport.includes(sport)&&
  //     registrationData.Individual_sport.includes(sport)
  //   );
  // };
  const isSportRegistered = (sport) => {
    return (
      individualRegistrationData.includes(sport) || teamRegistrationData.includes(sport)
    );
  };

  return (
    <div >
      <div className="container2">
        <div className='carousel-wrapper'>
          <Slider {...settings}>
            {data.map((d, index) => (
              <div key={index} className='carousel-item'>
                <div className='image-wrapper'>
                  <img src={d.img} alt="" className="carousel-image" onClick={() => handleClick(d.name)} />
                </div>
                <div className='content-wrapper'>
                  <p className="name">{d.name}</p>
                  <p className="review">{d.review}</p>
                  <p className="review">{d.type}</p>
                  {isSportRegistered(d.name) ? (
                    <p className="already-registered">Already Registered</p>
                  ) : (

                    <button className='read-more' onClick={() => handleClick(d.name)}  > Participate</button>
                  )}

                </div>

              </div>
            ))}
          </Slider>
        </div>
        <ToastContainer />
      </div>
      {/* <Services /> */}

    </div>

  )
}

const data = [
  {
    name: `Cricket`,
    img: cricket,
    review: `19 April 2024`,
    type: `Team Sports`
  },
  {
    name: `BasketBall`,
    img: BasketBall,
    review: `18 April 2024`,
    type: `Team Sports`
  },
  {
    name: `Football`,
    img: football,
    review: `21 April 2024`,
    type: `Team Sports`
  },
  {
    name: `tennis`,
    img: tennis,
    review: `23 April 2024`,
    type: `Individual Sports`
  },
  {
    name: `chess`,
    img: chess,
    review: `25  April 2024`,
    type: `Individual Sports`
  },
  {
    name: `tabletennis`,
    img: tabletennis,
    review: `28 April 2024`,
    type: `Individual Sports`
  },
];

export default Carosuel;