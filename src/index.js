import React from "react";
import ReactDOM from "react-dom";
import { unstable_createResource as createResource } from "react-cache";

import DarkSkyApi from 'dark-sky-api';
DarkSkyApi.apiKey = "";

let resortData = [
  { name: "Snow Summit", zipcode: 92315, state: "CA", lat: "34.2380183", lon: "-116.8916176" },
  { name: "Mammoth", zipcode: 93546, state: "CA", lat: "37.6307674", lon: "-119.050186" },
  { name: "Squaw Valley", zipcode: 96146, state: "CA", lat: "39.1969822", lon: "-120.2431602" },
  { name: "Alpine Meadows", zipcode: 96146, state: "CA", lat: "39.1644547", lon: "-120.2408818" },
  { name: "Jackson Hole", zipcode: 83025, state: "WY", lat: "43.5875453", lon: "-110.8301123" },
  { name: "Big Sky", zipcode: 59716, state: "MT", lat: "45.2882176", lon: "-111.4067207" },
  { name: "Snowbird", zipcode: 84092, state: "UT", lat: "40.5794328", lon: "-111.6585675" },
];

let lat = resortData[0].lat;
let lon = resortData[0].lon;
let resortName = resortData[0].name;

// Dark Sky API: https://darksky.net/dev/docs
//let endpoint = `https://api.darksky.net/forecast/${key}/${lat},${lon}?exclude=minutely,hourly`;
//let keyOpenWeather = "";
//endpoint = `api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&APPID=${keyOpenWeather}`;

let ResortWeatherResource = createResource(() => {
  const position = {
    latitude: lat,
    longitude: lon,
  };
  return DarkSkyApi.loadCurrent(position).then(res => {
    console.log(res);
    return res;
  })
});

let ResortWeatherForecastResource = createResource(() => {
  const position = {
    latitude: lat,
    longitude: lon,
  };
  return DarkSkyApi.loadForecast(position).then(res => {
    console.log(res);
    return res;
  })
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
  const dataWeather = ResortWeatherResource.read();
  return (
    <div>
      <h3>{resortName}</h3>
      Summary: {dataWeather.summary}<br />
      precipIntensity: {dataWeather.precipIntensity}<br />
      precipProbability: {dataWeather.precipProbability}<br />
      temperature: {dataWeather.temperature}°F<br />
    </div>
  );
}


function WeatherList1(props) {
  return (
    <ul>
      {ResortWeatherResource.read().daily.map(day => (
        <WeatherListItem key={day.time}>{day.summary}</WeatherListItem>
      ))}
    </ul>
  );
}

function WeatherForecastList(props) {
  const dataWeatherForecast = ResortWeatherForecastResource.read();
  const daily = [...dataWeatherForecast.daily.data]
  console.log(daily)
  return (
    <div>
      <h3>{resortName}</h3>
      <ul>
        {daily.map(day => (
          <li key={day.time}>{new Date(day.dateTime) + ": " +
            day.precipAccumulation + " (" +
            day.precipProbability + ") " +
            day.summary}</li>
        ))}
      </ul>
    </div>
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
        <WeatherList />
      </React.Suspense>
      <h2>Forecast</h2>
       <React.Suspense fallback={<div>...loading</div>}>
        <WeatherForecastList />
      </React.Suspense>
   </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
