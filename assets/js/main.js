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
