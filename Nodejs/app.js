const http = require('http');

// Порт, который будет использоваться (Plesk перенаправляет на указанный порт)
const PORT = process.env.PORT || 3000;

// Создание сервера
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world!');
});

// Запуск сервера
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});