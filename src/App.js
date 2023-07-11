import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "./WeatherCard";

const App = () => {
    const [searchValue, setSearchValue] = useState("lucknow");
    const [tempInfo, setTempInfo] = useState({});
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeatherInfo = async () => {
    try {
      let url =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
         searchValue  +
        "&units=metric&appid=" +
         apiKey ;


      let res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;
      const { icon: weatherIcon } = data.weather[0];

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
        weatherIcon,
      };

      setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, []);

  return (
    <div>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search by city name"
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={getWeatherInfo}
          >
            Search
          </button>
        </div>
      </div>

      {/* our temp card */}
      <WeatherCard tempInfo={tempInfo} />
    </div>
  );
};

export default App;
