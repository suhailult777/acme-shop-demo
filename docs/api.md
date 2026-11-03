# API reference

All responses are JSON.

| Method | Path | What it does |
|---|---|---|
| GET | `/health` | Liveness check, returns `{"ok": true}` |
| GET | `/api/v1/products` | List all products |
| GET | `/api/v1/products/:id` | One product, or 404 |
| GET | `/api/v1/orders` | List orders placed since the server started |
| POST | `/api/v1/orders` | Place an order. Body: `{"items": [{"productId": "tee-01", "qty": 2}]}` |
