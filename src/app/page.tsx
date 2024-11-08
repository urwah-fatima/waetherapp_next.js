'use client'
// pages/index.js
import { useState } from 'react';
import Weather from './components/Weather';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=316629eba20ab6c5e2022fb71cd6ce99`
      );
      const data = await response.json();

      if (data.cod === '404') {
        setError('City not found. Please try another city.');
      } else if (data.cod === '401') {
        setError('Invalid API Key. Please check your API key.');
      } else if (data.cod !== 200) {
        setError('An unexpected error occurred. Please try again.');
      } else {
        setWeather(data);
      }
    } catch (error) {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (city.trim()) fetchWeather();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8">Weather App</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md flex mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="flex items-center justify-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        weather && <Weather weather={weather} />
      )}
    </div>
  );
}
