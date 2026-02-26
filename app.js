const express = require('express');
const app = express();
const port = 8080;
let latitude = null;
let longitude = null;
let data = null;
let scale = null;

// Process the data from zipcode
function setLocation(data) {
  data = data.results.pop();
  latitude = data.latitude;
  longitude = data.longitude;
}

// Process the temperature data into a JSON object
function setData(dat) {
  console.log(dat);
  data = {"temperature": dat.current.temperature_2m, "scale": scale};
}

app.use(express.json());

app.get('/locations/:zip', async (req, res) => {
  scale = req.query.scale || "Fahrenheit";
  const zip = req.params.zip;
  const geocodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${zip}&count=1&language=en&format=json&countryCode=US`;
  
  // Call API to convert zipcode to lat/long
  await fetch(geocodeUrl)
    .then( res => res.json() )
    .then( data => setLocation(data));

  // Set the scale correctly
  let weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&temperature_unit=fahrenheit`;
  if (scale == "Celsius") {
    weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`;
  }

  // Call API to find temperature data of lat/long
  await fetch(weatherUrl)
    .then( res => res.json() )
    .then( data => setData(data));
  res.status(200).send(data);
});

app.listen(port, () => {
  console.log(`${port}`);
});