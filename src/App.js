import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const today = new Date();

  const currentDate = today.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const currentTime = today.toLocaleTimeString("en-IN");

  const getWeather = async () => {
    if (city.trim() === "") {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=58c5bdcf0334af1a399e12e4f3df1323&units=metric`
      );

      const data = await response.json();

      if (data.cod !== 200) {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong.");
      setWeather(null);
    }

    setLoading(false);
  };

  const clearWeather = () => {
    setCity("");
    setWeather(null);
    setError("");
  };

  let emoji = "🌤";

  if (weather) {
    const condition = weather.weather[0].main;

    if (condition === "Clear") emoji = "☀";
    else if (condition === "Clouds") emoji = "☁";
    else if (condition === "Rain") emoji = "🌧";
    else if (condition === "Thunderstorm") emoji = "⛈";
    else if (condition === "Snow") emoji = "❄";
    else if (condition === "Mist") emoji = "🌫";
  }

  return (
    <div className="App">

      <div className="weather-card">

        <h1>🌤 Weather App</h1>

        <h3>{currentDate}</h3>
        <h3>{currentTime}</h3>

        <input
          type="text"
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather();
            }
          }}
        />

        <br />
        <br />

        <button onClick={getWeather}>Search</button>

        <button className="clear-btn" onClick={clearWeather}>
          Clear
        </button>

        <br />
        <br />

        {loading && <h2>Loading...</h2>}

        {error && <h3>{error}</h3>}

        {weather && (
          <div>

            <h2>
              {emoji} {weather.name}
            </h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />

            <h2>{weather.main.temp} °C</h2>

            <p><b>Condition:</b> {weather.weather[0].main}</p>

            <p><b>Feels Like:</b> {weather.main.feels_like} °C</p>

            <p><b>Max Temp:</b> {weather.main.temp_max} °C</p>

            <p><b>Min Temp:</b> {weather.main.temp_min} °C</p>

            <p><b>Humidity:</b> {weather.main.humidity}%</p>

            <p><b>Pressure:</b> {weather.main.pressure} hPa</p>

            <p><b>Wind Speed:</b> {weather.wind.speed} m/s</p>

            <p><b>Visibility:</b> {weather.visibility / 1000} km</p>

            <p><b>Country:</b> {weather.sys.country}</p>

            <p><b>Latitude:</b> {weather.coord.lat}</p>

            <p><b>Longitude:</b> {weather.coord.lon}</p>

            <p>
              <b>Sunrise:</b>{" "}
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
            </p>

            <p>
              <b>Sunset:</b>{" "}
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
            </p>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;