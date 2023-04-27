const fs = require('fs');
const http = require('http');
const url = require('url');
const hostname = "localhost";
const port = "8000";

const server = http.createServer((req, res) => {
    const urlPath = url.parse(req.url, true).pathname;
    const urlParts = urlPath.split('/').filter(part => part !== '');

    if (urlParts[0] === '/search/[Name_user]') {
        const username = urlParts[1];
        fs.readFile('Data/all.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end("404 Not Found");
            } else {
                const jsonData = JSON.parse(data);
                const result = jsonData.filter((item) => {
                    let query = username.toLowerCase();
                    return item.name === query;
                })[0];
                if (!result) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end("404 Not Found");
                } else {
                    res.writeHead(200, {'Content-Type': 'application/json'});
                    res.write(JSON.stringify(result));
                    res.end();
                }
            }
        });
    } else if (urlPath === '/all') {
        fs.readFile('Data/all.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end("404 Not Found");
            } else {
                const jsonData = JSON.parse(data);
                res.writeHead(200, {'Content-Type': 'application/json'});
                res.write(JSON.stringify(jsonData));
                res.end();
            }
        });
    } else if (url === 'test') {
        fs.readFile('test.html', (err, data) => {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end("404 Not Found");
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end("404 Not Found");
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});