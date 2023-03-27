import React from 'react';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import './App.css';
import ListGroup from 'react-bootstrap/ListGroup';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // lonLat: [],
      city: '',
      cityData: {},
      error: false,
      errorMessage: ''
    }
  }

  handleCityInput = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let url = `${process.env.REACT_APP_SERVER}/weather?city_name=${this.state.city}`

      let cityData = await axios.get(url);

      console.log(cityData.data);
    } catch (error) {
      console.log(error.message);
    } 
  }
  // ** async/await - handle our asynchronous code
  // ** try/catch - handle our errors - TRY resolve our successful promises & CATCH handle rejected promise

  getCityData = async (event) => {
    event.preventDefault();

    try {
      // TODO: Use axios to get the data from LocationIQ - using city in state
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);

      console.log(cityDataFromAxios.data[0])

      // TODO: Set State with the data that comes back from axios & set error boolean to false
      this.setState({
        cityData: cityDataFromAxios.data[0],
        mapUrl: `https://maps.locationiq.comv3staticmap?key=${process.env.LOCATIONIQ_API_KEY}&center=${cityDataFromAxios.data[0].lat},${cityDataFromAxios.data[0].lon}&zoom=13`,
        error: false
      });

    } catch (error) {

      // TODO: Set state with the error boolean and the error message
      this.setState({
        error: true,
        errorMessage: error.message
      })
    }

  }



  render() {

    return (
      <>
        <h1>Summon City Info</h1>

        <form onSubmit={this.getCityData}>
          <label > Enter City:
            <input type='text' onChange={this.handleCityInput} />
          </label>
          <button type='submit'>Explore!</button>
        </form>


        {
          this.state.error
            ? <p>{this.state.errorMessage}</p>
            : Object.keys(this.state.cityData).length > 0 &&
            <ul>
              <p id="title">{this.state.cityData.display_name}</p>
              <Image class="img-fluid" src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.LOCATIONIQ_API_KEY}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=13`} alt='Map of location' />
              <p>{this.state.cityData.lon}</p>
              <p>{this.state.cityData.lat}</p>
            </ul>
        }

      </>
    )
  }
}

export default App;




//  <h1>API CALLS</h1>

//        <form>
//          <button type='submit' onClick={this.handleGetLocation}>Pin Point Location</button>
//        </form>

//          <ul>
//         {this.state.lonLat.map((longLati, idx) => <li lon key={idx}>{longLati.lon}</li>)}

//  </ul>





 // handleGetLocation = async (event) => {
  //   event.preventDefault();

  //   let lonLat = await axios.get('https://us1.locationiq.com/v1/search.php');

  //   console.log(lonLat.lon);

  //   this.setState({
  //     lonLat: lonLat.lon
  //   })

  // }