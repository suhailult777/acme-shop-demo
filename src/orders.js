// Orders live in memory and reset when the server restarts.
const { findProduct } = require("./catalog");

const orders = [];

function createOrder(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("an order needs at least one item");
  }
  let totalInr = 0;
  for (const item of items) {
    const product = findProduct(item.productId);
    if (!product) throw new Error(`unknown product ${item.productId}`);
    const qty = Number(item.qty || 1);
    totalInr += product.priceInr * qty;
  }
  const order = { id: `ord-${orders.length + 1}`, items, totalInr, status: "placed" };
  orders.push(order);
  return order;
}

function listOrders() {
  return orders.map((o) => ({ ...o }));
}

module.exports = { createOrder, listOrders };
