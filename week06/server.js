const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(“<html maaa=a >
    <head>
        <style>
            body div #myid{
            width:100px;
            background-color: #ff5000;
        }
            body div img{
            width:30px;
            background-color: #ff1111;
        }
        </style>
    </head>
    <body>
    <div>
        <img id="myid"/>
        <img />
    </div>
    </body>
    </html>”);});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

