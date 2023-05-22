import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useState} from 'react';


function App() {
  
  // let cityName = "Dallas, Dallas County, Texas, USA"
  const [cityName, setCityName] = useState("Memphis Memphis Memphis")
  const [cityLat, setCityLat] = useState("Memphis Memphis Memphis")
  const [cityLon, setCityLon] = useState("Memphis Memphis Memphis")


  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          {/* Edit <code>src/App.js</code> and save to reload. */}
          <form onSubmit={function(event){
            // console.log(event.target[0].value)
            let userinput = event.target[0].value
            console.log(userinput)
              event.preventDefault()
              let response = axios.get('https://us1.locationiq.com/v1/search?key=pk.b6d3832ae317acf0353a11f5e0a49041&q='+ userinput + '&format=json')
              response.then(function (res){
                let citydata = res.data[0]
                console.log(citydata)
                console.log(citydata.display_name)
                console.log(citydata.lat)
                console.log(citydata.lon)

                // cityName = citydata.display_name
                setCityName(citydata.display_name)
                setCityLat(citydata.lat)
                setCityLon(citydata.lon)


              })
          }}>
            <input />

            <button>Explore!</button>
          </form>
        </p>

          <h1>{cityName}</h1>
          <h1>{cityLat}</h1>
          <h1>{cityLon}</h1>


      </header>
    </div >
  );
}

export default App;
