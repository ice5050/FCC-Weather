function WeatherService() {
  var WEATHER_API_URL = "http://api.openweathermap.org/data/2.5/weather?appid=469276e8947162623c4b6df1e3ceda33&units=imperial";

  return {
    getCurrentWeather: getCurrentWeather
  };

  function getCurrentWeather(lat, lon, callback) {
    var script = document.createElement('script');
    script.src = WEATHER_API_URL + "&lat=" + lat + "&lon=" + lon + "&callback=" + callback.name;
    document.getElementsByTagName('body')[0].appendChild(script);
  }
}
