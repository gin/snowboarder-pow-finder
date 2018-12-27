import React from "react";
import ReactDOM from "react-dom";
import { unstable_createResource as createResource } from "react-cache";

import DarkSkyApi from 'dark-sky-api';
DarkSkyApi.apiKey = "";

let resortData = [
  { name: "Mammoth", zipcode: 93546, state: "CA", lat: "37.6307674", lon: "-119.050186" },
  { name: "Squaw Valley", zipcode: 96146, state: "CA", lat: "39.1969822", lon: "-120.2431602" },
  { name: "Alpine Meadows", zipcode: 96146, state: "CA", lat: "39.1644547", lon: "-120.2408818" },
  { name: "Jackson Hole", zipcode: 83025, state: "WY", lat: "43.5875453", lon: "-110.8301123" },
  { name: "Big Sky", zipcode: 59716, state: "MT", lat: "45.2882176", lon: "-111.4067207" },
  { name: "Snowbird", zipcode: 84092, state: "UT", lat: "40.5794328", lon: "-111.6585675" },
];

let lat = resortData[0].lat;
let lon = resortData[0].lon;

// Dark Sky API: https://darksky.net/dev/docs
//let endpoint = `https://api.darksky.net/forecast/${key}/${lat},${lon}?exclude=minutely,hourly`;
//let keyOpenWeather = "";
//endpoint = `api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&APPID=${keyOpenWeather}`;

let ResortWeatherResource = createResource(() => {
  //let options = {
  //  mode: "no-cors",
  //  headers: {
  //    //"Access-Control-Allow-Origin": "*",
  //    "Content-Type": "text/plain",
  //    //"Content-Type": "application/json",
  //  }
  //};
  //fetch(endpoint, options).then(res => res.json())

  const position = {
    latitude: lat,
    longitude: lon,
  };
  return DarkSkyApi.loadCurrent(position).then(res => console.log)
});

function ResortListItem({className, component: Component = "li", ...props}) {
  return (
    <Component
      className={["resort-list-item", className].join(" ")}
      {...props}
    />
  );
}

function WeatherListItem({className, component: Component = "li", ...props}) {
  return (
    <Component
      className={["weather-list-item", className].join(" ")}
      {...props}
    />
  );
}

function WeatherList(props) {
  return (
    <ul>
      {ResortWeatherResource.read().daily.data.map(day => (
        <WeatherListItem key={day.time}>{day.summary}</WeatherListItem>
      ))}
    </ul>
  );
}

function App() {
  return (
    <div>
      <h1>POW finder</h1>
      <h2>Pass</h2>
      <ul>
        <li>Ikon</li>
        <li>Mountain Collective</li>
      </ul>
      <h2>Resort</h2>
      <ul>
        {resortData.map(resort => (
          <ResortListItem key={resort.name} className="resort">
            {resort.name}, {resort.state}
          </ResortListItem>
        ))}
      </ul>
      <h2>Weather</h2>
      <React.Suspense fallback={<div>...loading</div>}>
        {/* <WeatherList /> */}
      </React.Suspense>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
