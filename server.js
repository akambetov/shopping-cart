const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {  
  let filePath = req.url.substr(1);
    //Правильный Content-Type
    if (filePath.indexOf('svg') >= 0) {
      res.setHeader('Content-Type', 'image/svg+xml;');
    }
    else if (filePath.indexOf('jpeg') >= 0) {
      res.setHeader('Content-Type', 'image/jpeg;');
    }
    else if (filePath.indexOf('css') >= 0) {
      res.setHeader('Content-Type', 'text/css;');
    }
    else if (filePath.indexOf('js') >= 0) {
      res.setHeader('Content-Type', 'text/javascript;');
    }
    
    fs.access(filePath, fs.constants.R_OK, err => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.write('Not Found!');
      res.end('<h3 style="color:#f09d51">http://localhost:3000/index.html</h3>')
    } else {
      fs.createReadStream(filePath).pipe(res)
    }    
  });
}).listen(3000);

console.log('Server On');