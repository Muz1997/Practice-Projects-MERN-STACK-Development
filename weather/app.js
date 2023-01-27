const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
let myKEy = "6103c9cdd85761716c1f529e3e4a7ae8";


app.get('/location', (req, res) => {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${myKEy}`;
  request({url: url, json: true }, function(error, response) {
    if (error) {
      console.log('Unable to connect to Forecast API');
    } else {
      console.log('It is currently ' +
        response.body.main.temp +
        ' degrees out.'
      );
      console.log('The high today is ' +
        response.body.main.temp_max +
        ' with a low of ' +
        response.body.main.temp_min
      );
      console.log('Humidity today is ' +
        response.body.main.humidity
      );
      let humidity = 'Humidity today is '+ response.body.main.humidity;
      res.send(humidity);
    }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});
