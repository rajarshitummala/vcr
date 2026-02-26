## Design Rationale

My design uses OpenMeteo for the APIs. I felt this was the best option because it was the easiest to use and did not require me creating an API Key or an account. OpenMeteo also allowed me to use it both as a geocoder as well as accessing the weather. Most other APIs would have had me use another API to get location information.

My design takes in the zipcode and optional scale parameter from the GET request. If the scale parameter is undefined, it will be automatically set to Fahrenheit. Then, it will take the zipcode and use OpenMeteo to look for the longitude and latitude that match the zipcode. I had to do this because OpenMeteo requires longitude and latitude to look up weather. OpenMeteo returns a JSON object which is parsed in a seperate function for those two values, which are set globally. Then, the longitude and latitude are used to fill out the API request for the actual temperature. If the scale is set to Celsius, the link will change to match it. OpenMeteo returns a JSON object which is parsed for the temperature value. A new JSON object is constructed and sent.

## References

All of the code is my original work. I used resources like W3Schools, the OpenMeteo API documentation and StackOverflow for documentation and help, but the code is my own work.
The APIs I used are from OpenMeteo which is available here: https://open-meteo.com/