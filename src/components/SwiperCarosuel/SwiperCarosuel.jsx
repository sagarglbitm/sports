import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './SwiperCarosuel.css';
import React,{ useState } from 'react';
import cricket from '../../Assets/pexels-patrick-case-3800517.jpg'
import BasketBall from '../../Assets/pexels-img-števonka-2116469.jpg'
import tennis from '../../Assets/pexels-cottonbro-studio-5739122 (1).jpg'
import tabletennis from '../../Assets/table_tennis.png'
import football from '../../Assets/pexels-alexander-nadrilyanski-3651672.jpg'
import chess from '../../Assets/pexels-pixabay-260024.jpg'
 



const SwiperCarosuel = () => {

 

  const settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 2, 
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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

  
  
  return (
    <div >
   
    <div className="container-swiper">
      <div className='carousel-wrapper-swiper'>
        <Slider {...settings}>
          {data.map((d, index) => (
            <div key={index} className='carousel-item-swiper'>
              <div className='image-wrapper-swiper'>
                <img src={d.img} alt="" className="carousel-image-swiper"   />
              </div>
              <div className='content-wrapper'>
                
              </div>
            </div>
          ))}
        </Slider>
      </div>
      </div>
   
     
    </div>
    
  )
}

const data = [
  {
    name: `Cricket`,
    img: cricket,
    review: `10 march 2024`
  },
  {
    name: `BasketBall`,
    img: BasketBall,
    review: `11 march 2024`
  },
  {
    name: `Football`,
    img: football,
    review: `12 march 2024`
  },
  {
    name: `tennis`,
    img: tennis,
    review: `13 March 2024`
  },
  {
    name: `chess`,
    img: chess,
    review: `14 march 2024`
  },
  {
    name: `tabletennis`,
    img: tabletennis,
    review: `15 march 2024`
  },
];

export default SwiperCarosuel;