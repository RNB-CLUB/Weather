import { createServer } from "http";
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const server = createServer(async (req, res) => {
    const filePath = req.url === "/" ? "./index.html" : `.${req.url}`;
    try {
        const data = await readFile(path.join(__dirname, "static", filePath));
        const ext = path.extname(filePath);
        const contentType = ext === ".css" ? "text/css" :
            ext === ".js" ? "text/javascript" : "text/html";

        res.setHeader("Content-Type", contentType);
        res.end(data);
    } catch {
        res.statusCode = 404;
        res.end("Файл не знайдено");
    }

});

server.listen(3000, () => {
    console.log("Сервер запущен");
});