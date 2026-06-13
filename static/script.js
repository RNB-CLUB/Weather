const themeToggle = document.getElementById('theme-toggle');
const searchInput = document.getElementById('searchInput');
const datalist = document.getElementById('cities');
const weatherDiv = document.querySelector('.weather');
const errorDiv = document.querySelector('.error');

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = (savedTheme === 'dark');

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
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

        weatherDiv.className = 'weather visible'; 
        const conditionText = data.current.condition.text.toLowerCase();
        
        if (conditionText.includes('сонце') || conditionText.includes('clear')) {
            weatherDiv.classList.add('sunny');
        } else if (conditionText.includes('хмар') || conditionText.includes('cloud')) {
            weatherDiv.classList.add('cloudy');
        } else if (conditionText.includes('дощ') || conditionText.includes('rain')) {
            weatherDiv.classList.add('rainy');
        }

        weatherDiv.innerHTML = `
            <div class="weather-header"><h2>Погода в ${data.location.name}</h2></div>
            <div class="weather-content">
                <div class="weather-left">
                    <img src="https:${data.current.condition.icon}" alt="weather">
                    <p style="font-size: 40px; font-weight: bold;">${Math.round(data.current.temp_c)}°C</p>
                    <p>${data.current.condition.text}</p>
                </div>
                <div class="weather-right">
                    <p>Відчувається як: ${Math.round(data.current.feelslike_c)}°C</p>
                    <p>Вітер: ${data.current.wind_kph} км/год</p>
                    <p>Вологість: ${data.current.humidity}%</p>
                </div>
            </div>
        `;
    } catch (error) {
        weatherDiv.innerHTML = "";
        weatherDiv.classList.remove('visible');
        errorDiv.textContent = "Не вдалося отримати дані.";
    }
}