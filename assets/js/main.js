//Traemos los Elementos del DOM con los que trabajaremos
const input = document.querySelector("#input_ciudad")
const form = document.querySelector("#form")
const resultContainer = document.querySelector(".resultado_container")
const parragraphContainer = document.querySelector(".parrafo")

//Guardamos la Api Key, para poder trabajar con la Weather Api
const KEY = "adae4a20143333443419045138aeaa7c";

// Creamos la llamada A la API
const requestCity = async city => {
  try {
    const response = await fetch(
      //Realiza un Fetch a la URL de la Weather Api y le pasamos la ciudad (${city}) y la KEY (${KEY})
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=es&APPID=${KEY}`
    );
      //En caso de funcionar, la respuesta que nos de la API la pasamos a Formato JSON para poder interpretarla 
    const data = await response.json();
      //Retornamos data
    return data;
  } catch (error) {
    console.error(error);
  }
};

//Creamos una funcion para redondear el Numero que le pasemos por parametro
const roundNumber = number => Math.round(number);

//Esta funcion agarra o trae todos los Datos necesarios de la API en un nombre mas facil y no tener que estar repitiendo el DOT Notation
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

//Gracias a la anterior funcion creamos el Template HTML de la Card, Con nombres de variables mas simples
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

//Renderizamos la Card en el DIV del resultado
const renderCityCard = (cityData) =>{
  resultContainer.innerHTML = createCardTemplate(cityData)
}

//Cambiamos el Mensaje que se muestra, para poder hacerlo dinamico a Cada ciudad que se muestre
const changeParragraphMesagge = (cityData) =>{
    parragraphContainer.innerHTML = `
      <p>Asi esta El Clima en <b>${cityData.name}</b></p>
    `
}

//Esta funcion nos devuelve un Booleano, que nos da true si el input esta vacio y false si tiene algo, asi validamos que no este vacio
const isEmptyInput = () =>{
  return input.value.trim() === ''
}

//Funcion que nos permite renderizar el error de Vacio
const renderEmptyError = () =>{
  resultContainer.innerHTML = `
  <div class="error">
      <img src="assets/media/advertencia.png" alt="" />
      <h2>!Ups¡ Debes ingresar una Ciudad para poder Buscarla =)</h2>
    </div>
  `
}

//Esta funcion nos devuelve un Booleano, que nos da true si no hay nada en el ID de city data esto quiere decir que la ciudad que se ingreso en el Input no existe
const isInvalidCity = (cityData) =>{
  return !cityData.id
}

//Funcion que nos permite renderizar el error de ciudad No Valida
const renderInvalidError = () =>{
  resultContainer.innerHTML = `
  <div class="error">
  <img src="assets/media/advertencia.png" alt="" />
  <h2>
    !Ups¡ Aparentemente no hay una ciudad que coincida con lo ingresado =(
  </h2>
</div> 
  `
}

//Esta funcion se ejecutara cuando se envie el Formulario
const searchCity = async(e) =>{
  //Saca el Default del Evento, para que no se refresque la Pagina
  e.preventDefault()

  //Chequear si el Input esta vacio
  if (isEmptyInput()){
      //Si esta vacio renderizamos el error y retornamos
      renderEmptyError()
      return;
  }
  //Ahora que sabemos que no esta Vacio
  //Hacemos el fetch
  const fetchedCity = await requestCity(input.value)

  //Chequear si la ciudad es Valida
  if(isInvalidCity(fetchedCity)){
    //Si no es valida renderizamos el Error y retornamos
      renderInvalidError()
      return;
  }
  
  //Si es valida, renderizamos la Card, Cambiamos el Mensaje del Parrafo y reseteamos el form
  renderCityCard(fetchedCity);
  changeParragraphMesagge(fetchedCity)
  form.reset()

}

//Creamos nuestra funcion Init donde le agregamos el Event Listener al form, que escucha el Evento submit y ejecuta la funcion searchCity
const init = () => {
  form.addEventListener("submit", searchCity)
}
//Llamamos a init
init();