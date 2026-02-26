const assert = require('assert');
const http = require('http');
const app = require('./app');

const server = app.listen(3000);

// I based my tests design off of a skeleton from W3Schools, especially the data chunking to properly grab the JSON
// Link I used: https://www.w3schools.com/nodejs/nodejs_testing.asp
http.get('http://localhost:8080/locations/24060', (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    const temp = JSON.parse(data);
    assert.strictEqual(res.statusCode, 200, 'Status code should be 200');
    assert.strictEqual(temp.scale, "Fahrenheit", 'Scale not properly returning');
    assert.ok(typeof temp.temperature == typeof 1.1, 'Temperature is not being returned as a number');
    
    console.log("All tests passed!");
    server.close();
  });
}).on('error', (err) => {
  console.error('Test failed:', err);
  server.close();
}); 