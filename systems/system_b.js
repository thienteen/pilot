const express = require('express');
const app = express();
app.use(express.json());
const port = 3002;

app.post('/api/users/import', (req, res) => {
    const users = req.body.users;
    console.log("System B received:", JSON.stringify(users, null, 2));
    
    const errors = [];
    users.forEach(u => {
        if (!u.email.includes('@company.com')) errors.push(`Invalid email for ${u.fullName}`);
    });

    if (errors.length > 0) return res.status(400).json({ success: false, errors });
    res.json({ success: true, count: users.length });
});
app.listen(port, () => console.log(`System B (Target) running on port ${port}`));