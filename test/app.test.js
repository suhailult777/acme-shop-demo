const test = require("node:test");
const assert = require("node:assert");
const http = require("node:http");
const { handle } = require("../src/app");

function call(server, method, path, body) {
  const { port } = server.address();
  return new Promise((resolve, reject) => {
    const req = http.request({ port, method, path, headers: { "content-type": "application/json" } }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => resolve({ status: res.statusCode, body: JSON.parse(data) }));
    });
    req.on("error", reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

test("health and products", async () => {
  const server = http.createServer(handle).listen(0);
  try {
    assert.equal((await call(server, "GET", "/health")).status, 200);
    const products = await call(server, "GET", "/api/products");
    assert.equal(products.status, 200);
    assert.ok(products.body.length >= 3);
  } finally {
    server.close();
  }
});

test("checkout places an order and the old v1 route is gone", async () => {
  const server = http.createServer(handle).listen(0);
  try {
    const order = await call(server, "POST", "/api/checkout", { items: [{ productId: "tee-01", qty: 2 }] });
    assert.equal(order.status, 201);
    assert.equal(order.body.totalInr, 1598);
    assert.equal((await call(server, "POST", "/api/v1/orders", { items: [] })).status, 404);
  } finally {
    server.close();
  }
});
