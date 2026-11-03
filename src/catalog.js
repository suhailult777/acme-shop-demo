// In-memory product catalog. Good enough for a demo shop.
const products = [
  { id: "tee-01", name: "Switch logo tee", priceInr: 799, stock: 40 },
  { id: "mug-01", name: "Ship-it mug", priceInr: 449, stock: 25 },
  { id: "sticker-01", name: "Laptop sticker pack", priceInr: 199, stock: 300 },
];

function listProducts() {
  return products.map((p) => ({ ...p }));
}

function findProduct(id) {
  const p = products.find((x) => x.id === id);
  return p ? { ...p } : null;
}

module.exports = { listProducts, findProduct };
