const express = require('express');
const app = express();
const port = 3000;

// 静的ファイルの提供
//app.use(express.static('public'));
// テンプレートエンジンの設定 (EJSを使用)
app.set('view engine', 'ejs');

// ルートへのGETリクエストに対する応答
app.get('/', (req, res) => {
    const data = { message: 'Hello, Express with EJS!' };
    res.render('index', data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

function loginAsAdmin() {
  fetch('http://localhost:3000/admin', {
      method: 'GET',
      credentials: 'include', // クッキーを含めるために必要
      mode: 'cors'
  })
  .then(response => {
      if (response.ok) {
          alert('Successfully logged in as Admin');
      } else {
          alert('Failed to log in as Admin');
      }
  })
  .catch(error => {
      console.error('Error:', error);
  });
}