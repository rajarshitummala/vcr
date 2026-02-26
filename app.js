const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.get('/locations/:zip', (req, res) => {
  const {scale} = req.query;
  const zip = req.params.zip;
  res.send(`${scale} ${zip}`);
});

app.listen(port, () => {
  console.log(`${port}`);
});