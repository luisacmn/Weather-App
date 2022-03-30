import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

const api = {
  key: "8f65b8fc54f51dbf0663631455270d6c",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  const [query, setQuery] = useState(""); //query is th city name on the input. Its empty
  const [weather, setWeather] = useState({});

  const btnclick = () => {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) //fetch(url) method to request data from this URL API
      .then((res) => res.json()) //Promise: response as a json file
      .then((result) => {
        setWeather(result);
        setQuery("");
        console.log(result);
      });
  };

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`) //fetch(url) method to request data from this URL API
        .then((res) => res.json()) //Promise: response as a json file
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  const dateBuilder = () => {
    //React não aceita função como filha. Se o html direciona para uma função, tem que usar ela como uma arrow function e guardar em uma const
    const d = new Date();

    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let months = [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} - ${date}/${month}/${year}`;
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search a city..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <span className="searchIcon" onClick={btnclick}>
            {" "}
            <BiSearch />{" "}
          </span>
        </div>
        {typeof weather.main !== "undefined" ? ( //conditional: Se o main de weather não for undefenined, mostrar a estrutura abaixo:
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div>
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                />{" "}
              </div>
              <div className="weather">{weather.weather[0].main}</div>
              <div className="description">
                {weather.weather[0].description}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;

//O método getMonth() retorna o mês na data especificada de acordo com o horário local, como um valor zero-based (onde o zero indica o primeiro mês do ano).
//O método getDay() retorna o dia da semana para a data especificada de acordo com a hora local, onde 0 representa o Domingo.
//Usei o site do React-icons para o ícone de pesquisa (nome do ícone de acordo com o fornecedor)
