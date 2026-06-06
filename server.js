import { createServer } from "http";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = "a85e06d2a31c43d9bc4135230263005";
const server = createServer(async (req, res) => {
    if (req.url.startsWith("/api/weather")) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const city = url.searchParams.get("city");

        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`);
            const data = await response.json();

            if (!response.ok) {
                res.statusCode = response.status;
                return res.end(JSON.stringify({ message: data.error.message }));
            }

            const result = {
                city: data.location.name,
                temp: data.current.temp_c,
                description: data.current.condition.text,
                icon: data.current.condition.icon
            };

            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
        } catch (err) {
            res.statusCode = 500;
            res.end(JSON.stringify({ message: "Помилка сервера" }));
        }
    }
    else {
        // Логіка для віддачі головної сторінки (index.html)
        const filePath = req.url === "/" ? "./index.html" : `.${req.url}`;
        try {
            const data = await readFile(filePath);
            const ext = path.extname(filePath);
            const contentType = ext === ".css" ? "text/css" :
                ext === ".js" ? "text/javascript" : "text/html";

            res.setHeader("Content-Type", contentType);
            res.end(data);
        } catch {
            res.statusCode = 404;
            res.end("Файл не знайдено");
        }
    }
});

server.listen(3000, () => {
    console.log("Сервер запущен");
});