const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
    secret: 'your-secret-key', // セッションIDを署名するための秘密鍵
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // HTTPSでない場合はfalse
}));

app.get('/admin', (req, res) => {
    // セッションにユーザーが管理者であるかどうかを示す情報を保存
    req.session.isAdmin = true;
    res.status(200).send('Admin page');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});