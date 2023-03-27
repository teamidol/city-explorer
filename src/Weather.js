import React from 'react';
import Card from 'react-bootstrap/Card';
import WeatherDay from './WeatherDay';

class Weather extends React.Component {
  render() {

    return (
      <section className='cards'>
        {this.props.weatherData.map((day, idx) => {
          return (

              <Card key={idx} style={{ width: '15 rem' }}>
              <WeatherDay 
                day={day}
                idx={idx}
                />
              </Card>


          )
        })}

      </section>
    )

  }
}

export default Weather;