import React, { useEffect, useState } from "react";
import "./Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setError(null)
      setIsLoading(true);
      if (!city.trim()) {
        return alert("Enter city name first");
      }
      if (!city) {
        setError("City not found!");
      }
      const apiKey = "9b77b8c8dd34819975c426571d13a521";
      const url = await fetch(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${city}`,
      );
      const data = await url.json();
      if (data.success === false) {
        setError("City not found!");
        setIsLoading(false);
        return;
      }
      setError(null);
      setWeatherData(data.current);
      setLocation(data.location);
      setCity("");
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        <h2>Weather App</h2>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
        {/* Fetching data and showing user loading... */}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div>
            {/* Only showing fields when data is fetched successfully */}
            {location.name ? <h2>City: {location.name}</h2> : ""}
            {weatherData.temperature ? (
              <h2>Temperature: {weatherData.temperature}°C</h2>
            ) : (
              ""
            )}
            {weatherData.humidity ? (
              <h2>Humidity: {weatherData.humidity}%</h2>
            ) : (
              ""
            )}
            {weatherData.wind_speed ? (
              <h2>Wind speed: {weatherData.wind_speed}km/h</h2>
            ) : (
              ""
            )}
            {error && <h3>{error}</h3>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
