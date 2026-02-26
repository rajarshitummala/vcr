const express = require('express');
const app = express();
const port = 8080;
let data = [];

function setData(dat) {
  data.push(dat);
}

app.use(express.json());

app.get('/locations/:zip', async (req, res) => {
  const {scale} = req.query;
  const zip = req.params.zip;
  const url = "https://api.open-meteo.com/v1/forecast?latitude=37.2296&longitude=-80.4139&current=temperature_2m";
  
  await fetch(url)
    .then( res => res.json() )
    .then( data => setData(data));
  console.log(data[0])
  res.send(data.pop());
});

app.listen(port, () => {
  console.log(`${port}`);
});