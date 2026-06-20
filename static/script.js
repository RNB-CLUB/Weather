const API_KEY = "a85e06d2a31c43d9bc4135230263005";

const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('searchInput');
const datalist = document.getElementById('cities');
const weatherDiv = document.querySelector('.weather');
const errorDiv = document.querySelector('.error');
const mainWeatherContent = document.getElementById('mainWeatherContent');
const forecastContainer = document.getElementById('forecastContainer');

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
        const url = `https://api.weatherapi.com/v1/search.json?q=${city}&key=${API_KEY}`;
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
<<<<<<< HEAD
    
=======
    const forecastContainer = document.getElementById('forecastContainer');

>>>>>>> 4256e12f587622165f6604358331c3a7a481aebc
    if (!city) {
        errorDiv.textContent = "Будь ласка, введіть назву міста";
        if (weatherDiv) weatherDiv.style.display = 'none';
        return;
    }
<<<<<<< HEAD

    try {
        const currentUrl = `https://api.weatherapi.com/v1/current.json?q=${city}&key=${API_KEY}&lang=uk`;
        const currentResponse = await fetch(currentUrl);
        if (!currentResponse.ok) throw new Error("Місто не знайдено");
        const data = await currentResponse.json();

        const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=${API_KEY}&lang=uk`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        errorDiv.textContent = "";

        const conditionText = data.current.condition.text.toLowerCase();
        weatherDiv.classList.remove('sunny', 'cloudy', 'rainy');
        if (conditionText.includes('сонце') || conditionText.includes('clear')) {
            weatherDiv.classList.add('sunny');
        } else if (conditionText.includes('хмар') || conditionText.includes('cloud')) {
            weatherDiv.classList.add('cloudy');
        } else if (conditionText.includes('дощ') || conditionText.includes('rain')) {
            weatherDiv.classList.add('rainy');
        }

        const currentForecast = forecastData.forecast.forecastday[0]?.day || {};

        mainWeatherContent.innerHTML = `
            <div class="weather-header"><h2>Погода в ${data.location.name}</h2></div>
            <div class="weather-content">
                <div class="weather-left">
                    <img src="https:${data.current.condition.icon}" alt="weather">
                    <p style="font-size: 45px; font-weight: bold;">${Math.round(data.current.temp_c)}°C</p>
                    <p style="font-weight: 500;">${data.current.condition.text}</p>
                </div>
                <div class="weather-right">
                    <p>Відчувається як: <b>${Math.round(data.current.feelslike_c)}°C</b></p>
                    <p>Вітер: <b>${data.current.wind_kph} км/год</b> (${data.current.wind_dir})</p>
                    <p>Вологість: <b>${data.current.humidity}%</b></p>
                    <p>Ймовірність дощу: <b>${currentForecast.daily_chance_of_rain || 0}%</b></p>
                    <p>Тиск: <b>${data.current.pressure_mb} мбар</b></p>
                    <p>УФ-індекс: <b>${data.current.uv}</b></p>
                    <p>Видимість: <b>${data.current.vis_km} км</b></p>
=======

    try {
        const currentUrl = `https://api.weatherapi.com/v1/current.json?q=${city}&key=a85e06d2a31c43d9bc4135230263005&lang=uk`;
        const currentResponse = await fetch(currentUrl);
        if (!currentResponse.ok) throw new Error("Місто не знайдено");
        const currentData = await currentResponse.json();

        const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?q=${city}&days=3&key=a85e06d2a31c43d9bc4135230263005&lang=uk`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        errorDiv.textContent = "";
        weatherDiv.innerHTML = `
            <div class="weather-header"><h2>Погода в ${currentData.location.name}</h2></div>
            <div class="weather-content">
                <div class="weather-left">
                    <img src="https:${currentData.current.condition.icon}" alt="weather">
                    <p style="font-size: 40px; font-weight: bold;">${Math.round(currentData.current.temp_c)}°C</p>
                    <p>${currentData.current.condition.text}</p>
                </div>
                <div class="weather-right">
                    <p>Відчувається як: ${Math.round(currentData.current.feelslike_c)}°C</p>
                    <p>Вітер: ${currentData.current.wind_kph} км/год</p>
                    <p>Вологість: ${currentData.current.humidity}%</p>
>>>>>>> 4256e12f587622165f6604358331c3a7a481aebc
                </div>
            </div>
        `;

        forecastContainer.innerHTML = '';
        
        forecastData.forecast.forecastday.forEach(day => {
            const date = new Date(day.date).toLocaleDateString('uk-UA', { weekday: 'long' });

            forecastContainer.innerHTML += `
                <div class="day-card">
                    <h4>${date}</h4>
                    <img src="https:${day.day.condition.icon}" style="width: 40px; margin: 0 auto;">
                    <p style="font-size: 20px; font-weight: bold;">${Math.round(day.day.avgtemp_c)}°C</p>
                    <p style="font-size: 12px;">${day.day.condition.text}</p>
                    <div style="border-top: 1px dashed #888; padding-top: 4px; margin-top: 2px;">
                        <p>💧 ${day.day.daily_chance_of_rain}%</p>
                        <p>💨 ${Math.round(day.day.maxwind_kph)} км/год</p>
                    </div>
                </div>
            `;
        });

        weatherDiv.classList.add('visible');

    } catch (error) {
<<<<<<< HEAD
        console.error(error);
        mainWeatherContent.innerHTML = "";
        forecastContainer.innerHTML = "";
        weatherDiv.style.display = 'none';
=======
        weatherDiv.innerHTML = "";
        weatherDiv.classList.remove('visible');
        forecastContainer.innerHTML = "";
>>>>>>> 4256e12f587622165f6604358331c3a7a481aebc
        errorDiv.textContent = "Не вдалося отримати дані.";
    }
}