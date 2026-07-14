const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
    // Parse URL to remove query parameters for file resolution
    const urlPath = req.url.split('?')[0];
    let filePath = path.join(__dirname, urlPath === '/' ? 'index.html' : urlPath);
    
    // Check if it's a directory and default to index.html
    try {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
            filePath = path.join(filePath, 'index.html');
        }
    } catch (e) {
        // Ignore and let standard error handling deal with it
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // Return 404 page if it exists, otherwise standard text
                const errorPagePath = path.join(__dirname, '404.html');
                fs.readFile(errorPagePath, (err404, content404) => {
                    res.writeHead(404, { 'Content-Type': 'text/html' });
                    if (!err404) {
                        res.end(content404, 'utf-8');
                    } else {
                        res.end('<h1>404 Not Found</h1><p>The requested page could not be found.</p>', 'utf-8');
                    }
                });
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`\x1b[32m[Genius Gems & Jewellery] Dev Server running at http://localhost:${PORT}\x1b[0m`);
    console.log(`Press Ctrl+C to stop the server.`);
});
