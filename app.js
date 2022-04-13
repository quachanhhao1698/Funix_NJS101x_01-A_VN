const http = require('http');

const server = http.createServer((req, res) => {
      console.log(req.url, req.method, req.headers);
      res.setHeader('Content-Type', 'text/html');
      res.write(
            `<html>
                  <head>
                        <title>App with NodeJS</title>
                  </head>
                  <body>
                        <h1>Hello from my Node.js server !</h1>
                  </body>
            </html>
                  `);
      
      res.end();

});

server.listen(3000)