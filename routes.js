const fs = require('fs');

const requestsHandler = (req, res) => {
      const url = req.url;
      const method = req.method;

      if(url === '/') {        
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
      if(url === '/message' && method ==='POST') {
            const body = [];
            req.on('data', (chunk) => {
                  console.log(chunk);
                  body.push(chunk);
            });
            return req.on('end',() => {
                  const parsebody = Buffer.concat(body).toString();
                  // console.log(parsebody);
                  const message = parsebody.split('=')[1];
                  console.log(message);
                  fs.writeFile('message.txt', message, err => {
                        res.statusCode = 302;
                        res.setHeader('Location', '/');
                        return res.end();
                      });
            });
      
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
};

// module.exports = requestHandler;

// module.exports = {
//       handler: requestsHandler,
//       someText: 'Some hard coded text'};

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestsHandler;
exports.someText = 'Some hard coded text';