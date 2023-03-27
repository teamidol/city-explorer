

import Carousel from 'react-bootstrap/Carousel';
import React from "react";

class Movie extends React.Component {
  render(){
    const{movie,idx,...rest}=this.props
    return (
      <Carousel.Item {...rest} key={idx}>
              <img
                className="d-block w-100"
                src={movie.image}
                alt={movie.title}
              />
              <Carousel.Caption className='carousel-caption'>
                <h3>{movie.title}</h3>
                <p className='carousel-text'>{movie.overview}</p>
              </Carousel.Caption>
            </Carousel.Item>
    )
  }
}





export default Movie;