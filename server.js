const http = require('http');
const fs = require('fs');

const DATA_FILE = 'data.json';

const readData = () => {
    if (!fs.existsSync(DATA_FILE)) {
        return { users: [], scores: {} };
    }
    const data = fs.readFileSync(DATA_FILE);
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

const handleRequest = (req, res) => {
    if (req.method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        });
        res.end();
        return;
    }

    if (req.method === 'POST' && req.url === '/register') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            const data = readData();
            if (data.users.find(user => user.username === username)) {
                res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ message: 'User already exists' }));
                return;
            }
            data.users.push({ username, password });
            data.scores[username] = 0;
            writeData(data);
            res.writeHead(201, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ message: 'User registered successfully' }));
        });
    } else if (req.method === 'POST' && req.url === '/login') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, password } = JSON.parse(body);
            const data = readData();
            const user = data.users.find(user => user.username === username && user.password === password);
            if (!user) {
                res.writeHead(400, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.end(JSON.stringify({ message: 'Invalid credentials' }));
                return;
            }
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.end(JSON.stringify({ message: 'Login successful', score: data.scores[username] }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.end(JSON.stringify({ message: 'Not Found' }));
    }
};

const server = http.createServer(handleRequest);

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});
