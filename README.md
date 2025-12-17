> **Prompt:**
> "I am building a Middleware API using Node.js Express. Create a standard folder structure for me including: `src/controllers`, `src/services`, `src/utils`, `src/routes`, and `src/app.js`. Give me the command to create these folders."

> **Prompt:**
> "Write a utility function to map data from System A to System B.
>
> **Source Data (System A) Example:** > `{ id: "NV_101", ho_ten: "Nguyễn Văn An", ngay_sinh: "15/05/1990", luong: "15000000" }`
>
> **Target Schema (System B) Requirement:**
>
> - `userId`: Map from `id`
> - `fullName`: Map from `ho_ten`
> - `birthDate`: Convert `ngay_sinh` (DD/MM/YYYY) to ISO format (YYYY-MM-DD).
> - `email`: Generate fake email from name (e.g., 'nguyen.van.an@company.com'), remove accents, lowercase.
> - `salary`: Convert string to number.
>
> Handle edge cases and accented characters for email generation."

> **Prompt:**
> "Create a service function `syncData`. It should:
>
> 1. Fetch data from System A (GET http://localhost:3001/api/nhan-vien) using axios.
> 2. Use the mapper function from `../utils/mapper.js` to transform the data.
> 3. Send the transformed data to System B (POST http://localhost:3002/api/users/import).
> 4. Return the result.
>    Handle try/catch blocks properly."

> **Prompt:**
> "Create a controller that calls `syncService.syncData` and returns the response to the client. Then create a route file to expose `POST /sync`."

> **Prompt:**
> "Setup a basic Express server on port 3000. Use body-parser and cors. Import the routes from `src/routes/api.js`. Add a simple health check route GET /."

---
