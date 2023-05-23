import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useState } from 'react';

<body />
function App() {

  // let cityName = "Dallas, Dallas County, Texas, USA"
  const [cityName, setCityName] = useState("Memphis Memphis Memphis")
  const [cityLat, setCityLat] = useState(47)
  const [cityLon, setCityLon] = useState(28)
  const [error, setError] = useState(null)

  let url = `https://maps.locationiq.com/v3/staticmap?key=pk.b6d3832ae317acf0353a11f5e0a49041&center=${cityLat},${cityLon}`
  console.log(url)

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
          <form onSubmit={function (event) {
            // console.log(event.target[0].value)
            let userinput = event.target[0].value
            console.log(userinput)
            event.preventDefault()
            
          // let weather = `http://localhost:3001/weather?lat=11&lon=11&searchQuery=Paris`
            let response = axios.get('https://us1.locationiq.com/v1/search?key=pk.b6d3832ae317acf0353a11f5e0a49041&q=' + userinput + '&format=json')

            response.then(function (res) {
              let citydata = res.data[0]
              // let weather response = axios.get(weather)
              // console.log(weatherResponse)
              // console.log(citydata)
              // console.log(citydata.display_name)
              // console.log(citydata.lat)
              // console.log(citydata.lon)



              // // cityName = citydata.display_name
               setCityName(citydata.display_name)
               setCityLat(citydata.lat)
               setCityLon(citydata.lon)

 
            }).catch (function (error)  {
              setError(error.message)

            })
          }}>
            <input />

            <button>Explore!</button>
          </form>
        </p>

        <h1>{cityName}</h1>
        <h1>{cityLat}</h1>
        <h1>{cityLon}</h1>
        <img src={url} />
        <h1>{error}</h1>
      </header>
    </div >
  );
}

export default App;
