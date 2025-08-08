const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    let filePath = decodeURIComponent(req.url);
    if (filePath.startsWith('/')) {
        filePath = filePath.slice(1);
    }
    if (filePath === '' || filePath === 'index.html') {
        filePath = path.join('views', 'index.html');
    } else if (filePath.startsWith('pics/')) {
        filePath = path.join('views', filePath);
    } else if (filePath === 'styles.css') {
        filePath = path.join('views', 'styles.css');
    } else if (filePath.endsWith('.html')) {
        filePath = path.join('views', filePath);
    } else {
        filePath = path.join('views', filePath);
    }

    const ext = path.extname(filePath);
    let contentType = 'text/html';

    switch (ext) {
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'application/javascript';
            break;
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
        case '.ico':
            contentType = 'image/x-icon';
            break;
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            fs.readFile(path.join('views', 'error.html'), (err404, errorPage) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(err404 ? '<h1>404 Not Found</h1>' : errorPage);
            });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        }
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
