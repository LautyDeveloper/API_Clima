const input = document.querySelector("#input_ciudad")
const form = document.querySelector("#form")
const resultContainer = document.querySelector(".resultado_container")
const parragraphContainer = document.querySelector(".parrafo")

const KEY = "adae4a20143333443419045138aeaa7c";

const requestCity = async city => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&APPID=${KEY}`
    );

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const roundNumber = number => Math.round(number);

const getCityData = (cityData) =>({
    cityName: cityData.name,
    imageName: cityData.weather[0].icon,
    cityWeatherInfo: cityData.weather[0].description,
    cityTemp: roundNumber(cityData.main.temp),
    cityST: roundNumber(cityData.main.feels_like),
    cityMaxTemp: roundNumber(cityData.main.temp_max),
    cityMinTemp: roundNumber(cityData.main.temp_min),
    cityHumidity: cityData.main.humidity
})
