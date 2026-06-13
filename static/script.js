const map = L.map('map').setView([50.45, 30.52], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

map.on('click', async (e) => {
    const { lat, lng } = e.latlng;
    const url = `https://api.weatherapi.com/v1/current.json?q=${lat},${lng}&key=a85e06d2a31c43d9bc4135230263005&lang=uk`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        searchInput.value = data.location.name;
        getWeather();
    } catch (error) {
        console.error(error);
    }
});

const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('searchInput');
const datalist = document.getElementById('cities');
const weatherDiv = document.querySelector('.weather');
const errorDiv = document.querySelector('.error');

const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeToggle.checked = (savedTheme === 'dark');

themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

async function searchCities() {
    const city = searchInput.value;
    if (city.length < 3) return;

    try {
        const url = `https://api.weatherapi.com/v1/search.json?q=${city}&key=a85e06d2a31c43d9bc4135230263005`;
        const response = await fetch(url);
        if (!response.ok) throw new Error("Помилка");

        const data = await response.json();
        datalist.innerHTML = '';
        data.forEach(location => {
            const option = document.createElement('option');
            option.value = location.name;
            option.textContent = `${location.name}, ${location.country}`;
            datalist.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

function debounce(func, timeout = 500) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

searchInput.addEventListener('input', debounce(searchCities, 500));

async function getWeather() {
    const city = searchInput.value;

    if (!city) {
        errorDiv.textContent = "Будь ласка, введіть назву міста";
        return;
    }

    try {
        const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=a85e06d2a31c43d9bc4135230263005&lang=uk`;
        const response = await fetch(url);

        if (!response.ok) throw new Error("Місто не знайдено");

        const data = await response.json();
        errorDiv.textContent = ""; 
        
        weatherDiv.innerHTML = `
            <div class="weather-header">
                <h2>Погода в ${data.location.name}</h2>
            </div>
            <div class="weather-content">
                <div class="weather-left">
                    <img src="https:${data.current.condition.icon}" alt="weather">
                    <p style="font-size: 40px; font-weight: bold;">${Math.round(data.current.temp_c)}°C</p>
                    <p>${data.current.condition.text}</p>
                </div>
                <div class="weather-right">
                    <p>Відчувається як: ${Math.round(data.current.feelslike_c)}°C</p>
                    <p>Вітер: ${data.current.wind_kph} км/год (${data.current.wind_dir})</p>
                    <p>Вологість: ${data.current.humidity}%</p>
                    <p>Ймовірність дощу: ${data.current.chance_of_rain}%</p>
                    <p>Тиск: ${data.current.pressure_mb} мбар</p>
                    <p>Видимість: ${data.current.vis_km} км</p>
                </div>
            </div>
        `;
        
        weatherDiv.classList.add('visible');
    } catch (error) {
        weatherDiv.innerHTML = "";
        weatherDiv.classList.remove('visible');
        errorDiv.textContent = "Не вдалося отримати дані. Перевірте назву міста.";
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
