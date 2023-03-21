import React from 'react';
import axios from 'axios';


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

  // ** async/await - handle our asynchronous code
  // ** try/catch - handle our errors - TRY resolve our successful promises & CATCH handle rejected promise

  getCityData = async (event) => {
    event.preventDefault();

    try {
      // TODO: Use axios to get the data from LocationIQ - using city in state
      let url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&q=${this.state.city}&format=json`

      let cityDataFromAxios = await axios.get(url);

      console.log(cityDataFromAxios.data[0])

      // TODO: Set State with the data that comes back from axios & set error boolean to false
      this.setState({
        cityData: cityDataFromAxios.data[0],
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
            : <p>{this.state.cityData.display_name}</p>
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