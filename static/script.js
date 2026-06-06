const button = document.getElementById("getWeatherBtn");
const input = document.getElementById("cityInput");
const resultDiv = document.getElementById("result");


let weather;
fetch(base_url + "&q=london").then(res => res.json()).then(data => {
    weather = data
    updateWeather()
}
)

function updateWeather() {
    document.querySelector(".current-weather .icon").setAttribute("src", weather.current.condition.icon)
}
button.addEventListener("click", async () => {
  const cityName = input.value.trim();

  if (cityName === "") {
    resultDiv.innerHTML = "Пожалуйста, введите название города";
    return;
  }

  resultDiv.innerHTML = "Загрузка...";

  try {
    const response = await fetch(`/api/weather?city=${cityName}`);
    const data = await response.json();

    if (response.ok) {
      resultDiv.innerHTML = `
                <div style="margin-top: 15px;">
                    <h3>Погода в: ${data.city}</h3>
                    <img src="https:${data.icon}" alt="Иконка погоды">
                    <p style="font-size: 24px; font-weight: bold;">${Math.round(data.temp)}°C</p>
                    <p>На улице: ${data.description}</p>
                </div>
            `;
    } else {
      resultDiv.innerHTML = `Ошибка: ${data.message}`;
    }
  } catch (error) {
    resultDiv.innerHTML = "Не удалось связаться с сервером";
  }
});
