const express = require('express');
const app = express();
const port = 8080;
let data = null;
let scale = null;

function setData(dat) {
  data = {"temperature": dat.current.temperature_2m, "scale": scale};
}

app.use(express.json());

app.get('/locations/:zip', async (req, res) => {
  scale = req.query.scale;
  const zip = req.params.zip;
  const url = "https://api.open-meteo.com/v1/forecast?latitude=37.2296&longitude=-80.4139&current=temperature_2m";
  
  await fetch(url)
    .then( res => res.json() )
    .then( data => setData(data));
  res.send(data);
});

app.listen(port, () => {
  console.log(`${port}`);
});