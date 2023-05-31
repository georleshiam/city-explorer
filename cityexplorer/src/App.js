import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useState } from 'react';
import Weatherday from './weather.js';
import Movie from './movie.js';


function App() {

  // let cityName = "Dallas, Dallas County, Texas, USA"
  const [cityName, setCityName] = useState("Memphis Memphis Memphis")
  const [cityLat, setCityLat] = useState(47)
  const [cityLon, setCityLon] = useState(28)
  const [error, setError] = useState(null)
  const [weatherData, setWeatherData] = useState([ {date: "1/12/22", description: "test description"} ])
  const [errorAPI, setErrorAPI] = useState(500)
  const [movieData, setMovieData] = useState([])

  let movieDataHTML = movieData.map((element)=>{ return <Movie data= {element.original_title} />})
  
  

  let url = `https://maps.locationiq.com/v3/staticmap?key=pk.b6d3832ae317acf0353a11f5e0a49041&center=${cityLat},${cityLon}`
  // console.log(url)
  let weatherDataHTML = weatherData.map((element)=>{ return <Weatherday date= {element.description} />})
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
          <form onSubmit={function (event) {
            console.log(event.target[0].value)
            let userinput = event.target[0].value
            // console.log(userinput)
            event.preventDefault()
            
          // let weather = `http://localhost:3001/weather?lat=11&lon=11&searchQuery=Paris`
            let response = axios.get('https://us1.locationiq.com/v1/search?key=pk.b6d3832ae317acf0353a11f5e0a49041&q=' + userinput + '&format=json')

            response.then(function (res) {
              let citydata = res.data[0]

              // // cityName = citydata.display_name
               setCityName(citydata.display_name)
               setCityLat(citydata.lat)
               setCityLon(citydata.lon)

 
            }).catch (function (error)  {
              setError(error.message)

            })

            let weatherResponse = axios.get('https://city-explorer-api-juty.onrender.com/weather?searchQuery=Memphis'+ userinput)
            weatherResponse.then(function (res){
              setWeatherData(res.data)
                console.log(res.data)
                
            }).catch(function(err){
              setError(error.message)

            })

            let movieResponse = axios.get('https://city-explorer-api-juty.onrender.com/movies?movie='+ userinput)
            movieResponse.then(function (res){
              console.log("Test")
              setMovieData(res.data)
                console.log(res.data)
                
            }).catch(function(err){
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
        {weatherDataHTML}
        {movieDataHTML}
        <h1>{error}</h1>
      </header>
    </div >
  );
}

export default App;
