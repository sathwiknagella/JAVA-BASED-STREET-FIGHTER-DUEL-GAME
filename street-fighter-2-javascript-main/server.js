const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.ogg': 'audio/ogg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.json': 'application/json',
};

const BASE_DIR = __dirname;

function createServer(port) {
    const server = http.createServer((req, res) => {
        let reqPath = decodeURI(req.url.split('?')[0]);
        if (reqPath === '/') reqPath = '/index.html';

        const safePath = path.normalize(path.join(BASE_DIR, reqPath));
        if (!safePath.startsWith(BASE_DIR)) {
            res.writeHead(403);
            res.end('Access Denied');
            return;
        }

        fs.stat(safePath, (err, stats) => {
            if (err || !stats.isFile()) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end('404 Not Found');
                return;
            }

            const ext = path.extname(safePath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';

            const range = req.headers.range;
            const fileSize = stats.size;

            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunksize = (end - start) + 1;
                const file = fs.createReadStream(safePath, { start, end });

                res.writeHead(206, {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': contentType,
                });
                file.pipe(res);
            } else {
                res.writeHead(200, {
                    'Content-Length': fileSize,
                    'Content-Type': contentType,
                    'Accept-Ranges': 'bytes',
                });
                fs.createReadStream(safePath).pipe(res);
            }
        });
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log(`Port ${port} in use, trying port ${port + 1}...`);
            createServer(port + 1);
        } else {
            console.error('Server error:', err);
        }
    });

    server.listen(port, () => {
        const url = `http://localhost:${port}`;
        console.log(`Street Fighter 2 server running at: ${url}`);
        console.log('Opening game in default browser...');
        exec(`start ${url}`);
    });
}

createServer(8000);
