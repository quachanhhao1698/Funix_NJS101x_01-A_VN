const http = require('http');

const server = http.createServer((req, res) => {
      console.log(req.url, req.method, req.headers);
      const url = req.url;
      if(url === '/') {
            res.setHeader('Content-Type', 'text/html');
            res.write(
                  `<html>
                        <head>
                              <title>Enter Message</title>
                        </head>
                        <body>
                              <form action="/message" method="POST">
                              <input type="text" name="message">
                              <button type="submit">Send</button>
                              </form>
                        </body>
                  </html>
                        `);
            
            return res.end(); 
      }
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