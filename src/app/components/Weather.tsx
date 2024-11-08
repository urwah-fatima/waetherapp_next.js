// Import React library
import React from 'react';

// Define Weather component that accepts a 'weather' prop of any type
const Weather = ({ weather }: any) => {
  // Construct the URL for the weather icon
  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  // Render the weather information
  return (
    <div className="text-center bg-blue-500 text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto mt-8">
      {/* Display the city name */}
      <h2 className="text-2xl font-semibold">{weather.name}</h2>
      {/* Display the weather description */}
      <p className="text-lg capitalize">{weather.weather[0].description}</p>
      {/* Display the weather icon */}
      <img src={iconUrl} alt="Weather Icon" className="w-20 h-20 mx-auto" />
      {/* Display the temperature */}
      <div className="text-5xl font-bold">{Math.round(weather.main.temp)}°C</div>
      {/* Display the "feels like" temperature */}
      <p>Feels like {Math.round(weather.main.feels_like)}°C</p>
      {/* Display the humidity */}
      <p>Humidity: {weather.main.humidity}%</p>
      {/* Display the wind speed */}
      <p>Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  );
};

// Export the Weather component as the default export
export default Weather;