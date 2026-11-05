# Getting started

You need Node.js 20 or newer. There are no npm dependencies.

1. Clone the repo.
2. Run `npm install` (it does nothing yet, but keeps the habit).
3. Start the server with `npm run dev`.
4. Open http://localhost:3000/health and check you see `{"ok":true}`.

To try an order:

```bash
curl -X POST http://localhost:3000/api/v1/orders \
  -H 'content-type: application/json' \
  -d '{"items":[{"productId":"tee-01","qty":2}]}'
```
