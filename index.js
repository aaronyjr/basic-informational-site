const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);

    let filename = "";
    if (q.pathname == "/") {
        filename = "./index.html";
    } else {
        filename = "." + q.pathname;
    }

    fs.readFile(filename, function(err, data) {
        if (err) {
            fs.readFile("404.html", "utf-8", (error, errorData) => {
                if (error) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.write(err);
                    return res.end();
                }
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.write(errorData);
                return res.end();
            });
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        }
    });
}).listen(8080);