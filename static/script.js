const API_KEY = "a85e06d2a31c43d9bc4135230263005"
async function searchCities() {
    document.querySelector('#cities').innerHTML = '';
    const city = document.getElementById('searchInput').value || document.getElementById('cities').value;
    if (!city) return;
    try {
        const url = `http://api.weatherapi.com/v1/search.json?q=${city}&key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Місто не знайдено");

        const data = await response.json();
        data.forEach(location => {
            document.querySelector('#cities').innerHTML += `<option value="${location.name}">${location.name}, ${location.country}</option>`;
        });
        document.querySelector('#cities')
    } catch (error) {
        console.error(error);
    }
}

document.getElementById('searchInput').addEventListener('input', searchCities);

function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

const debouncedSearch = debounce(() => {
    searchCities();
}, 500);

document.getElementById('searchInput').addEventListener('input', debouncedSearch);

async function getWeather() {

    const city = document.getElementById('searchInput').value || document.getElementById('cities').value;

    try {
        const url = `http://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Місто не знайдено");

        const data = await response.json();
document.querySelector('.weather').innerHTML = `
        <h2>Погода в ${data.location.name}</h2>
        <img src="https:${data.current.condition.icon}" alt="weather">
        <p style="font-size: 32px;">${Math.round(data.current.temp_c)}°C</p>
        <p>Відчувається як: ${Math.round(data.current.feelslike_c)}°C</p>
        <p>Вітер: ${data.current.wind_kph} км/год (${data.current.wind_dir})</p>
        <p>Вологість: ${data.current.humidity}%</p>
        <p>Ймовірність дощу: ${data.current.chance_of_rain}%</p>
    `;
    } catch (error) {
        console.error(error);
    }
}





























// const button = document.getElementById("getWeather");
// const input = document.getElementById("cityInput");
// const resultDiv = document.getElementById("result");


// let weather;
// fetch(base_url + "&q=london").then(res => res.json()).then(data => {
//     weather = data
//     updateWeather()
// }
// )

// function updateWeather() {
//     document.querySelector(".current-weather .icon").setAttribute("src", weather.current.condition.icon)
// }
// button.addEventListener("click", async () => {
//   const cityName = input.value.trim();

//   if (cityName === "") {
//     resultDiv.innerHTML = "Пожалуйста, введите название города";
//     return;
//   }

//   resultDiv.innerHTML = "Загрузка...";

//   try {
//     const response = await fetch(`/api/weather?city=${cityName}`);
//     const data = await response.json();

//     if (response.ok) {
//       resultDiv.innerHTML = `
//                 <div style="margin-top: 15px;">
//                     <h3>Погода в: ${data.city}</h3>
//                     <img src="https:${data.icon}" alt="Иконка погоды">
//                     <p style="font-size: 24px; font-weight: bold;">${Math.round(data.temp)}°C</p>
//                     <p>На улице: ${data.description}</p>
//                 </div>
//             `;
//     } else {
//       resultDiv.innerHTML = `Ошибка: ${data.message}`;
//     }
//   } catch (error) {
//     resultDiv.innerHTML = "Не удалось связаться с сервером";
//   }
// });
