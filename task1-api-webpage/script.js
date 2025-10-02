// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  var searchBtn = document.getElementById('search');
  var cityInput = document.getElementById('city');
  var resultDiv = document.getElementById('result');

  // Weather code descriptions
  var weatherCodes = {
    0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
    45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
    55: 'Dense drizzle', 61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain',
    71: 'Slight snow', 73: 'Moderate snow', 75: 'Heavy snow', 95: 'Thunderstorm',
    99: 'Severe hail'
  };

  // Event listeners
  searchBtn.addEventListener('click', doSearch);
  cityInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') doSearch();
  });

  // Main function to fetch weather
  function doSearch() {
    var city = cityInput.value.trim();
    if (!city) {
      alert('Please enter a city name');
      return;
    }

    resultDiv.innerHTML = '<em>Loading…</em>';

    // 1) Geocoding API
    fetch('https://geocoding-api.open-meteo.com/v1/search?name=' + encodeURIComponent(city) + '&count=1')
      .then(function(geoResp) { return geoResp.json(); })
      .then(function(geoData) {
        if (!geoData.results || geoData.results.length === 0) {
          throw new Error('City not found');
        }
        var lat = geoData.results[0].latitude;
        var lon = geoData.results[0].longitude;
        var name = geoData.results[0].name;
        var country = geoData.results[0].country;

        // 2) Weather API
        return fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true')
          .then(function(weatherResp) { return weatherResp.json(); })
          .then(function(weatherData) {
            var current = weatherData.current_weather;
            var desc = weatherCodes[current.weathercode] || 'Weather code ' + current.weathercode;

            // 3) Display results
            resultDiv.innerHTML = ''
              + '<h2>' + name + (country ? ', ' + country : '') + '</h2>'
              + '<p>Temperature: <strong>' + current.temperature + ' °C</strong></p>'
              + '<p>' + desc + '</p>'
              + '<p>Wind: ' + current.windspeed + ' m/s (dir ' + current.winddirection + '°)</p>'
              + '<p class="small">Lat: ' + lat.toFixed(2) + ', Lon: ' + lon.toFixed(2)
              + ' — fetched at ' + new Date().toLocaleString() + '</p>';
          });
      })
      .catch(function(err) {
        resultDiv.innerHTML = '<span style="color: crimson">Error: ' + err.message + '</span>';
        console.error(err);
      });
  }
});