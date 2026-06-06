import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app); 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'static')));

app.get('/api/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'Вы не ввели город!' });
    }

    const api_key = 'a85e06d2a31c43d9bc4135230263005'; 
    const url = `https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=no&lang=ru`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ message: data.error.message });
        }

        res.json({
            city: data.location.name,
            temp: data.current.temp_c,
            description: data.current.condition.text,
            icon: data.current.condition.icon
        });

    } catch (error) {
        res.status(500).json({ message: 'Ошибка' });
    }
});

server.listen(3000, () => {
    console.log(`Сервер запущен`);
});