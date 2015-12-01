$(document).ready(function() {
  navigator.geolocation.getCurrentPosition(function(position) {
    WeatherService().getCurrentWeather(position.coords.latitude, position.coords.longitude, updateWeather);
  });
});

function updateWeather(data) {
  var $location = $(".location"),
      $weatherIcon = $(".weather-icon i"),
      $temperatureFahrenheit = $(".temperature .fahrenheit"),
      $temperatureCelcius = $(".temperature .celcius");

  $location.text(data.name);
  $weatherIcon
    .removeClass()
    .addClass("wi")
    .addClass(weatherCodeToIcon(data.weather[0].icon));
  $temperatureFahrenheit.text(data.main.temp);
  $temperatureCelcius.text(fahreheitToCelcius(data.main.temp));
  getImageByLocation(data.name, updateBackground);
}

function getImageByLocation(location, callback) {
  var GOOGLE_API = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&imgsz=xxlarge&imgtype=photo";
  var script = document.createElement('script');
  script.src = GOOGLE_API + "&q=" + location + " flickr 500px" + "&callback=" + callback.name;
  document.getElementsByTagName('body')[0].appendChild(script);
}

function updateBackground(data) {
  var image = data.responseData.results[0].url,
      backgroundImage = $("body").css("background-image"),
      backgroundOverlay = backgroundImage.split("url")[0];

  $("body").css("background-image", backgroundOverlay + "url(" + image + ")");
}

function weatherCodeToIcon(weatherCode) {
  var codeToIcon = {
    "01d": "wi-day-sunny",
    "01n": "wi-night-clear",
    "02d": "wi-day-cloudy",
    "02n": "wi-night-alt-cloudy",
    "03d": "wi-cloud",
    "03n": "wi-cloud",
    "04d": "wi-cloudy",
    "04n": "wi-cloudy",
    "09d": "wi-showers",
    "09n": "wi-showers",
    "10d": "wi-day-rain",
    "10n": "wi-night-alt-rain",
    "11d": "wi-thunderstorm",
    "11n": "wi-thunderstorm",
    "13d": "wi-snow",
    "13n": "wi-snow",
    "50d": "wi-fog",
    "50n": "wi-fog"
  };

  return codeToIcon.hasOwnProperty(weatherCode) ? codeToIcon[weatherCode] : "wi-na";
}

function fahreheitToCelcius(fahrenheit) {
  return ((fahrenheit - 32) / 1.8).toFixed(1);
}
