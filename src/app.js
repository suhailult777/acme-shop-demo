// Request routing for the shop API. No framework, just node:http.
const { listProducts, findProduct } = require("./catalog");
const { createOrder, listOrders } = require("./orders");

function send(res, status, body) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try {
        resolve(data ? JSON.parse(data) : {});
      } catch (err) {
        reject(err);
      }
    });
  });
}

async function handle(req, res) {
  const url = new URL(req.url, "http://localhost");
  const path = url.pathname;

  if (req.method === "GET" && path === "/health") return send(res, 200, { ok: true });
  if (req.method === "GET" && path === "/api/products") return send(res, 200, listProducts());

  const productMatch = path.match(/^\/api\/products\/([\w-]+)$/);
  if (req.method === "GET" && productMatch) {
    const p = findProduct(productMatch[1]);
    return p ? send(res, 200, p) : send(res, 404, { error: "not found" });
  }

  if (req.method === "GET" && path === "/api/orders") return send(res, 200, listOrders());
  if (req.method === "POST" && path === "/api/checkout") {
    try {
      const body = await readJson(req);
      return send(res, 201, createOrder(body.items));
    } catch (err) {
      return send(res, 400, { error: err.message });
    }
  }

  return send(res, 404, { error: "no such route" });
}

module.exports = { handle };
