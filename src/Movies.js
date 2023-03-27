import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Movie from './Movie';

class Movies extends React.Component {
  render() {
    return (
      <Carousel >
        {this.props.movieInfo.map((movie, idx) => {
          return (
         <Movie movie={movie} idx={idx}/>
          )
        })}
      </Carousel>
    )
  }
}


export default Movies;