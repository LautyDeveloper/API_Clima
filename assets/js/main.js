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

const createCardTemplate = (cityData) =>{
  const {cityName, imageName, cityWeatherInfo, cityTemp, cityST, cityMaxTemp, cityMinTemp, cityHumidity} = getCityData(cityData);

  return `
  <div class="weather-card animate">
      <div class="weather-info-container">
        <h2 class="weather-title">${cityName}</h2>
        <p class="weather-description">${cityWeatherInfo}</p>
        <div class="weather-temp-container">
          <span class="weather-temp">${cityTemp} °</span>
          <span class="weather-st">${cityST}° ST</span>
        </div>
      </div>
      <div class="weather-img-container">
        <img src="./assets/img/${imageName}.png" alt="weather image" />
      </div>
      <div class="weather-extra-container">
        <div class="weather-minmax-container">
          <span class="weather-span"
            ><i class="fa-solid fa-arrow-up-long"></i>Max: ${cityMaxTemp}º</span
          >
          <span class="weather-span"
            ><i class="fa-solid fa-arrow-down-long"></i>Min: ${cityMinTemp}º</span
          >
        </div>
        <span class="weather-humidity">${cityHumidity}% Humedad</span>
      </div>
    </div>
  `
}

const renderCityCard = (cityData) =>{
  resultContainer.innerHTML = createCardTemplate(cityData)
}
