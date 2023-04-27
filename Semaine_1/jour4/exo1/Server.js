const http = require('http');
const fs = require('fs');

const students = [
    { name: 'Sonia' },
    { name: 'Antoine' },
];

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync('./index.html'));
    } else if (req.url === '/students') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(students));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync('./404.html'));
    }
}