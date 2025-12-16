Đây là hướng dẫn **cầm tay chỉ việc** từng bước một. Bạn sẽ đóng vai trò **Technical Lead**, còn **Cursor AI** sẽ là nhân viên lập trình viên của bạn.

Chúng ta sẽ không gõ code logic. Chúng ta sẽ **ra lệnh (Prompt)** cho Cursor viết.

---

### GIAI ĐOẠN 1: CHUẨN BỊ MÔI TRƯỜNG (SETUP)

Bạn cần cài sẵn: **Node.js** và **Cursor IDE**.

#### Bước 1: Khởi tạo thư mục dự án
Mở Terminal (hoặc CMD) và chạy các lệnh sau:

```bash
# 1. Tạo thư mục tổng
mkdir ai-pilot-project
cd ai-pilot-project

# 2. Khởi tạo file package.json
npm init -y

# 3. Cài các thư viện cần thiết
npm install express axios body-parser cors dotenv
```

#### Bước 2: Tạo Mock Systems (Hệ thống giả lập)
Phần này ta cần tạo cứng để có cái cho AI xử lý.
Tạo thư mục `mocks` và 2 file sau:

**File 1:** `mocks/system-a.js` (Nguồn dữ liệu cũ, tiếng Việt, lộn xộn)
```javascript
const express = require('express');
const app = express();
const port = 3001;

app.get('/api/nhan-vien', (req, res) => {
    res.json({
        data: [
            { id: "NV_101", ho_ten: "Nguyễn Văn An", ngay_sinh: "15/05/1990", luong: "15000000" },
            { id: "NV_102", ho_ten: "Trần Thị Bích", ngay_sinh: "20/11/1995", luong: "12000000" }
        ]
    });
});
app.listen(port, () => console.log(`System A (Source) running on port ${port}`));
```

**File 2:** `mocks/system-b.js` (Hệ thống mới, tiếng Anh, chuẩn ISO)
```javascript
const express = require('express');
const app = express();
app.use(express.json());
const port = 3002;

app.post('/api/users/import', (req, res) => {
    const users = req.body.users;
    console.log("System B received:", JSON.stringify(users, null, 2));
    
    // Giả lập validate
    const errors = [];
    users.forEach(u => {
        if (!u.email.includes('@company.com')) errors.push(`Invalid email for ${u.fullName}`);
    });

    if (errors.length > 0) return res.status(400).json({ success: false, errors });
    res.json({ success: true, count: users.length });
});
app.listen(port, () => console.log(`System B (Target) running on port ${port}`));
```

---

### GIAI ĐOẠN 2: DÙNG AI ĐỂ BUILD MIDDLEWARE (CORE)

Bây giờ hãy mở thư mục `ai-pilot-project` bằng **Cursor IDE**.

**Quy tắc:** Từ giờ bạn hạn chế gõ code. Hãy dùng phím tắt **`Cmd + L` (Chat)** hoặc **`Cmd + I` (Composer - Tự viết code vào file)**.

#### Bước 3: Prompt tạo cấu trúc dự án (Architecture)
Nhấn `Cmd + L` (Chat) và gõ prompt sau:

> **Prompt:**
> "I am building a Middleware API using Node.js Express. Create a standard folder structure for me including: `src/controllers`, `src/services`, `src/utils`, `src/routes`, and `src/app.js`. Give me the command to create these folders."

*Hành động:* Cursor sẽ đưa ra lệnh `mkdir...`. Bạn bấm nút **Run in Terminal** để nó tự tạo.

#### Bước 4: Prompt tạo Logic Mapping (Data Mapping Assessment)
Đây là phần quan trọng nhất. Nhấn `Cmd + I` (Composer), chọn tạo file `src/utils/mapper.js` và gõ:

> **Prompt:**
> "Write a utility function to map data from System A to System B.
>
> **Source Data (System A) Example:**
> `{ id: "NV_101", ho_ten: "Nguyễn Văn An", ngay_sinh: "15/05/1990", luong: "15000000" }`
>
> **Target Schema (System B) Requirement:**
> - `userId`: Map from `id`
> - `fullName`: Map from `ho_ten`
> - `birthDate`: Convert `ngay_sinh` (DD/MM/YYYY) to ISO format (YYYY-MM-DD).
> - `email`: Generate fake email from name (e.g., 'nguyen.van.an@company.com'), remove accents, lowercase.
> - `salary`: Convert string to number.
>
> Handle edge cases and accented characters for email generation."

*Hành động:* Cursor sẽ tự viết code hàm `mapData`. Bạn xem code, nếu thấy ổn thì bấm **Accept**.

#### Bước 5: Prompt tạo Service Integration (API Implementation)
Nhấn `Cmd + I`, chọn tạo file `src/services/syncService.js` và gõ:

> **Prompt:**
> "Create a service function `syncData`. It should:
> 1. Fetch data from System A (GET http://localhost:3001/api/nhan-vien) using axios.
> 2. Use the mapper function from `../utils/mapper.js` to transform the data.
> 3. Send the transformed data to System B (POST http://localhost:3002/api/users/import).
> 4. Return the result.
> Handle try/catch blocks properly."

#### Bước 6: Prompt tạo Controller & Route
Nhấn `Cmd + I`, chọn tạo file `src/controllers/syncController.js` và `src/routes/api.js`:

> **Prompt:**
> "Create a controller that calls `syncService.syncData` and returns the response to the client. Then create a route file to expose `POST /sync`."

#### Bước 7: Prompt tạo Server Entry point
Nhấn `Cmd + I`, chọn file `src/app.js`:

> **Prompt:**
> "Setup a basic Express server on port 3000. Use body-parser and cors. Import the routes from `src/routes/api.js`. Add a simple health check route GET /."

---

### GIAI ĐOẠN 3: DEBUGGING ASSESSMENT (THẨM ĐỊNH AI SỬA LỖI)

Đến đây code đã xong. Giờ ta chạy thử và đánh giá khả năng Debug của AI.

#### Bước 8: Chạy toàn bộ hệ thống
Mở 3 cái Terminal (Dấu cộng trong Cursor):

*   Terminal 1: `node mocks/system-a.js`
*   Terminal 2: `node mocks/system-b.js`
*   Terminal 3: `node src/app.js`

#### Bước 9: Gây lỗi giả và bắt AI sửa
Giả sử bạn chạy code và gặp lỗi (hoặc bạn cố tình sửa sai tên biến trong file `mapper.js`).

1.  **Gây lỗi:** Vào `mocks/system-b.js`, đổi port `3002` thành `3005` (nhưng không sửa code middleware).
2.  **Trigger:** Gọi API Sync (dùng Postman hoặc trình duyệt): `http://localhost:3000/sync`.
3.  **Kết quả:** Terminal middleware sẽ báo lỗi `ECONNREFUSED` (không kết nối được).
4.  **Test AI:** Copy dòng lỗi đó, paste vào Chat `Cmd + L`:
    > **Prompt:** "I got this error when running the sync: `Error: connect ECONNREFUSED 127.0.0.1:3002`. What is the cause and how do I fix it?"

*Đánh giá:* Xem Cursor có chỉ ra đúng là "Port System B bị sai hoặc server chưa bật" không.

---

### TỔNG KẾT DỰ ÁN (OUTPUT BẠN NHẬN ĐƯỢC)

Sau khi làm xong 9 bước này, bạn đã có:
1.  **Một bộ source code** tích hợp 2 hệ thống (Node.js).
2.  **Một file log (trong đầu hoặc ghi chú lại)** về các Prompt đã dùng:
    *   Prompt mapping data chạy tốt không? (Cần chi tiết Source/Target schema).
    *   Prompt debug có chính xác không?
3.  **Kết luận:** "Cursor AI có khả năng giảm 80% thời gian viết code boilerplate và mapping data, nhưng cần Senior Developer review kỹ logic validate email/ngày tháng." -> *Đây chính là báo cáo Pilot Project.*