const http = require('http');

const port = 4204;
const timeout = 100;

http.createServer((req, res) => {
    setTimeout(() => {
        res.statusCode = 200;
        res.end("I'm alive");
    }, timeout);
}).listen(port, "127.0.0.1", () => {
    console.log(`Listening localhost at port ${port}...`);
});
