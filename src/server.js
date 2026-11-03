// Entry point: starts the HTTP server.
const http = require("node:http");
const { handle } = require("./app");

const port = Number(process.env.SHOP_PORT || 3000);

const server = http.createServer((req, res) => {
  handle(req, res).catch((err) => {
    res.writeHead(500);
    res.end(String(err));
  });
});

server.listen(port, () => {
  console.log(`acme-shop listening on http://localhost:${port}`);
});
