import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import './App.css';
import Badge from 'react-bootstrap/Badge';
import Weather from './Weather';
import Movies from './Movies';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
      cityData: {},
      error: false,
      errorMessage: '',
      weatherData: [],
      movieInfo: []
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }


  // ** async/await - handle our asynchronous code
  // ** try/catch - handle our errors - TRY resolve our successful promises & CATCH handle rejected promise

  getCityData = async (event) => {
    event.preventDefault();

    try {
      // TODO: Use axios to get the data from LocationIQ - using city in state
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);



      // TODO: Set State with the data that comes back from axios & set error boolean to false
      this.setState({
        cityData: cityDataFromAxios.data[0],
        error: false
      });

      // TODO call weather handler
      let lat = cityDataFromAxios.data[0].lat;
      let lon = cityDataFromAxios.data[0].lon;
      this.handleGetWeather(lat, lon)
      this.getMovies();
    } catch (error) {

      // TODO: Set state with the error boolean and the error message
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }

  handleGetWeather = async (lat, lon) => {

    //TODO: USE AXIOS to hit the api (backend)
    //TODO: Set info to state
    try {
      //http://localhost:3001/weather?city_name=Seattle&lat=${}&lon=${}
      let url = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.city}&lat=${lat}&lon=${lon}`;

      let weatherDataFromAxios = await axios.get(url);

      console.log('Weather: ', weatherDataFromAxios.data);

      this.setState({
        weatherData: weatherDataFromAxios.data
      })

    } catch (error) {
      console.log(error.message);
    }
  }

  getMovies = async () => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/Movies?city_name=${this.state.city}`
      let movieDataFromAxios = await axios.get(url);
      console.log(movieDataFromAxios.data);

      this.setState({
        movieInfo: movieDataFromAxios.data
      });

    } catch (error) {
      console.log('getMovies' + error.message);
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }
  }

  // *** MAP PORTION OF YOUR LAB IMG SRC POINTS TO THIS URL: 
  // *** https://maps.locationiq.com/v3/staticmap?key=<YOUR API KEY>&center=<CITY'S LAT>,<CITY'S LON>&zoom=13

  render() {
    return (
      <>
        <h1>Type Your City in the Search Box!</h1>

        <form onSubmit={this.getCityData}>
          <label > Enter in a City:
            <input type="text" onChange={this.handleCityInput} />
          </label>
          <button type="submit">Explore!</button>
        </form>

        {/* TERNARY - WTF  */}
        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : Object.keys(this.state.cityData).length > 0 &&
            <ul>
              <Badge id="title" bg="light" text="dark">{this.state.cityData.display_name}</Badge>
              <Image class="img-fluid" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='Map of selected location' />
              <Badge class="badge" bg="light" text="dark">Lat {this.state.cityData.lon}</Badge>
              <Badge class="badge" bg="light" text="dark">Lon {this.state.cityData.lat}</Badge>
              <Weather weatherData={this.state.weatherData} />
              <Movies id= "movie" movieInfo={this.state.movieInfo} />
            </ul>

        }
      </>
    )
  }
}

export default App;