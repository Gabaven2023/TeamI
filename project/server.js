const express = require('express');
const app = express();
const port = 3000;

// 静的ファイルの提供
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
