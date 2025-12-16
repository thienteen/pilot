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