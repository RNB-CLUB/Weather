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

searchInput.addEventListener('input', debounce(searchCities, 500))

async function getWeather() {
    const city = searchInput.value;
    const forecastContainer = document.getElementById('forecastContainer');

    if (!city) {
        errorDiv.textContent = "Будь ласка, введіть назву міста";
        return;
    }

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
                </div>
            </div>
        `;
        weatherDiv.classList.add('visible');


        forecastContainer.innerHTML = '';
        forecastData.forecast.forecastday.forEach(day => {
            const date = new Date(day.date).toLocaleDateString('uk-UA', { weekday: 'long' });

            forecastContainer.innerHTML += `
    <div class="day-card">
        <h4>${date}</h4>
        <img src="https:${day.day.condition.icon}" style="width: 50px;">
        <p style="font-size: 24px; font-weight: bold;">${Math.round(day.day.avgtemp_c)}°C</p>
        <p style="font-size: 14px; color: var(--text-200);">${day.day.condition.text}</p>
        <hr style="border: 0; border-top: 1px solid #444; margin: 10px 0;">
        <p>💧 ${day.day.daily_chance_of_rain}%</p>
        <p>💨 ${Math.round(day.day.maxwind_kph)} км/год</p>
    </div>
`;
        });

    } catch (error) {
        weatherDiv.innerHTML = "";
        weatherDiv.classList.remove('visible');
        forecastContainer.innerHTML = "";
        errorDiv.textContent = "Не вдалося отримати дані.";
    }
}