import React from "react";

const WeatherBox = ({ weather }) => {
  console.log("weather", weather);
  return (
    <div className="Weather_box">
      <div>{weather?.name}</div>
      <h2>
        {weather?.main?.temp ?? 0}C /{" "}
        {((weather?.main?.temp ?? 0) * 1.8 + 32).toFixed(2)}F
      </h2>
      <h3>{weather?.weather[0]?.description}</h3>
    </div>
  );
};

export default WeatherBox;
