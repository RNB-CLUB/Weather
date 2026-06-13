<<<<<<< HEAD
const API_KEY = "a85e06d2a31c43d9bc4135230263005"
=======
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
>>>>>>> 5d226c62fccf96b9e744aac951a22ca1ef8661c1

async function searchCities() {
    const input = document.getElementById('searchInput')
    const datalist = document.querySelector('#cities')
    const city = input.value;
    
    if (city.length < 2) return

    try {
        const url = `https://api.weatherapi.com/v1/search.json?q=${city}&key=a85e06d2a31c43d9bc4135230263005`;
        const response = await fetch(url);
<<<<<<< HEAD
        if (!response.ok) return;
=======
        if (!response.ok) throw new Error("Помилка");
>>>>>>> 5d226c62fccf96b9e744aac951a22ca1ef8661c1

        const data = await response.json();
        datalist.innerHTML = ''
        data.forEach(location => {
            datalist.innerHTML += `<option value="${location.name}">${location.name}, ${location.country}</option>`
        });
    } catch (error) {
        console.error(error)
    }
}

function debounce(func, timeout = 500) {
    let timer
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout)
    };
}
document.getElementById('searchInput').addEventListener('input', debounce(searchCities, 500))

async function getWeather() {
<<<<<<< HEAD
    const city = document.getElementById('searchInput').value
    const weatherDiv = document.querySelector('.weather')
=======
    const city = searchInput.value;
>>>>>>> 5d226c62fccf96b9e744aac951a22ca1ef8661c1

    if (!city) {
        weatherDiv.style.display = 'none'
        return
    }

    try {
<<<<<<< HEAD
        const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}`
=======
        const url = `https://api.weatherapi.com/v1/current.json?q=${city}&key=a85e06d2a31c43d9bc4135230263005&lang=uk`;
>>>>>>> 5d226c62fccf96b9e744aac951a22ca1ef8661c1
        const response = await fetch(url);

        if (!response.ok) throw new Error("Місто не знайдено")

<<<<<<< HEAD
        const data = await response.json()
        

        weatherDiv.style.display = 'flex'

=======
        const data = await response.json();
        errorDiv.textContent = ""; 
        
>>>>>>> 5d226c62fccf96b9e744aac951a22ca1ef8661c1
        weatherDiv.innerHTML = `
            <div class="weather-header">
                <h2>Погода в ${data.location.name}</h2>
            </div>
            <div class="weather-content">
                <div class="weather-left">
<<<<<<< HEAD
                    <img src="https:${data.current.condition.icon}" alt="weather" style="width: 100px;">
=======
                    <img src="https:${data.current.condition.icon}" alt="weather">
>>>>>>> 5d226c62fccf96b9e744aac951a22ca1ef8661c1
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
<<<<<<< HEAD
    } catch (error) {
        console.error(error);
        weatherDiv.style.display = 'none'
        alert("Місто не знайдено або сталася помилка")
=======
        
        weatherDiv.classList.add('visible');
    } catch (error) {
        weatherDiv.innerHTML = "";
        weatherDiv.classList.remove('visible');
        errorDiv.textContent = "Не вдалося отримати дані. Перевірте назву міста.";
>>>>>>> 5d226c62fccf96b9e744aac951a22ca1ef8661c1
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
