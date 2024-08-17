import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import WeatherBox from "./component/WeatherBox/WeatherBox";
import WeatherButton from "./component/WeatherBox/WeatherButton";

// 앱이 실행되면 현재 위치 기반 날씨 적용

function App() {
  const [weather, setWeather] = useState(null);
  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b22e1ca10070028e4a443610cfd76e33&units=metric`;
    let response = await fetch(url);
    let data = await response.json();
    setWeather(data);
  };
  useEffect(() => {
    getCurrentLocation();
  }, []);
  return (
    <div>
      <div className="container">
        {" "}
        <WeatherBox weather={weather} />
        <WeatherButton />
      </div>
    </div>
  );
}

export default App;
