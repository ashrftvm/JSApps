const apiKey = '1ceec3a3751e4085a13193145232206';
const dateObj = new Date();

const getDayName = (dayType, dateVal = dateObj) => dateVal.toLocaleDateString('en-US', {weekday: dayType})


// Retrieve weather data from the API and update the UI
function fetchWeatherData(location) {
  // const endpoint = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
  const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(location)}&days=5`;

  const currentDay = getDayName('long');
  const fullDateStr = dateObj.toLocaleDateString('en-US',{day: "numeric", month: "short", year: "numeric"});
  document.querySelector(".date-day").textContent = fullDateStr;
  document.querySelector(".date-dayname").textContent = currentDay;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Update the UI with the received weather data
      // console.log(data)
      document.querySelector('.location').textContent = data.location.name + ', ' + data.location.country;
      document.querySelector('.weather-icon').src = data.current.condition.icon;
      document.querySelector('.weather-temp').textContent = data.current.temp_c + '°C';
      document.querySelector('.weather-desc').textContent = data.current.condition.text;
      document.querySelector(".wind .value").textContent = `${data.current.wind_kph} km/h`;
      document.querySelector(".humidity .value").textContent = `${data.current.humidity} %`;
      document.querySelector(".precipitation .value").textContent = `${data.current.precip_in} in`;
      if(data.current.is_day){
        document.querySelector(".weather-side").classList.replace("night", "day")
      }else{
        document.querySelector(".weather-side").classList.replace("day", "night")
      }

      updateForecastData(data.forecast)
    })
    .catch(error => {
      console.log('Error fetching weather data:', error);
    });
}

// function to update forecast data
function updateForecastData(forecastData){
  const weekContainer = document.querySelector(".week-list");
  weekContainer.innerHTML = "";
  forecastData.forecastday.forEach(dayObj => {
    const currentDate = new Date(dayObj.date)
    if(currentDate.toDateString() !== dateObj.toDateString()){
      const liEl = document.createElement("li");
      liEl.innerHTML = `
        <img class="day-icon" src="${dayObj.day.condition.icon}" alt="${dayObj.day.condition.text}">
        <span class="day-name">${getDayName('short', currentDate)}</span><span class="day-temp">${dayObj.day.maxtemp_c}°C</span>
      `
      weekContainer.appendChild(liEl)
    }
  });
  weekContainer.insertAdjacentHTML('beforeend', `<div class="clear"></div>`)
}

// Event listener for the search submit button
document.querySelector('.location-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const searchLocation = document.getElementById('search-input').value;
  if(searchLocation){
    // Call a function to fetch and display weather data for the searched location
    fetchWeatherData(searchLocation);
  }
});

// On page load, fetch and display the current weather for the user's location
navigator.geolocation.getCurrentPosition(position => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const location = `${latitude},${longitude}`;
  // fetchWeatherData(location);
}, error => {
  console.log('Error getting location:', error);
});
