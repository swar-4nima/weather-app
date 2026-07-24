import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const getWeather = async () => {
    if (!API_KEY) {
      setError("API key not configured. See .env.example");
      setWeather(null);
      return;
    }

    if (city.trim() === "") {
      setError("Please enter a city name.");
      setWeather(null);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.message || "City not found");
        setWeather(null);
      } else {
        const data = await response.json();
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
    setShowDetails(false);
  };

  return (
    <div className="App">
      <div className="weather-card">
        <h1 className="brand">Weather</h1>

        <div className="meta">
          <input
            type="text"
            placeholder="Search city"
            aria-label="Search city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") getWeather();
            }}
            autoFocus
          />

          <div className="actions">
            <button className="primary" onClick={getWeather} aria-label="Search">
              Search
            </button>
            <button className="ghost" onClick={clearWeather} aria-label="Clear">
              Clear
            </button>
          </div>
        </div>

        {loading && (
          <div className="status loading" role="status" aria-live="polite">
            <div className="spinner" aria-hidden="true"></div>
            <span>Loading…</span>
          </div>
        )}
        {error && (
          <div className="status error" role="alert">
            {error}
          </div>
        )}

        {weather && (
          <div className="result" role="region" aria-label="Weather results">
            <div className="main">
              <div className="place">
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <div className="place-text">
                  <div className="city">{weather.name}</div>
                  <div className="cond">{weather.weather[0].main}</div>
                </div>
              </div>

              <div className="temp">{Math.round(weather.main.temp)}°C</div>
            </div>

            <button
              className="details-toggle"
              onClick={() => setShowDetails((s) => !s)}
              aria-expanded={showDetails}
            >
              {showDetails ? "Hide details" : "More details"}
            </button>

            {showDetails && (
              <div className="details">
                <div>Feels like: {weather.main.feels_like}°C</div>
                <div>Humidity: {weather.main.humidity}%</div>
                <div>Wind: {weather.wind.speed} m/s</div>
                <div>Pressure: {weather.main.pressure} hPa</div>
                <div>Visibility: {weather.visibility / 1000} km</div>
                <div>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</div>
                <div>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;