import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox/WeatherBox";
import WeatherButton from "./component/WeatherBox/WeatherButton";
import ClipLoader from "react-spinners/ClipLoader";

// 앱이 실행되면 현재 위치 기반 날씨 적용

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");
  const cities = ["paris", "new york", "tokyo", "seoul"];
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b22e1ca10070028e4a443610cfd76e33&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
  };
  const getWeatherByCity = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b22e1ca10070028e4a443610cfd76e33&units=metric`;
      setLoading(true);
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity("");
    } else {
      setCity(city);
    }
  };
  return (
    <div>
      {loading ? (
        <div className="container">
          <ClipLoader color={"#ffffff"} loading={loading} size={150} />
        </div>
      ) : !apiError ? (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButton
            cities={cities}
            handleCityChange={handleCityChange}
            selectedCity={city}
          />
        </div>
      ) : (
        apiError
      )}
    </div>
  );
}

export default App;
