let currentTime = document.querySelector("#time");
let dateToday = new Date();
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[dateToday.getDay()];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[dateToday.getMonth()];
let year = dateToday.getFullYear();
let hours = ("0" + new Date().getHours()).slice(-2);
let minutes = ("0" + new Date().getMinutes()).slice(-2);
let date = dateToday.getDate();

currentTime.innerHTML = `${day}, ${month} ${date}, ${hours}:${minutes},${year}`;
//second challenge
function cityName(event) {
  event.preventDefault();
  let input = document.querySelector(".search");
  let h1 = document.querySelector("#city");
  h1.innerHTML = `${input.value}`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", cityName);
//body background style
let background = document.body;
const gifUrl =
  "https://media.tenor.com/gq6CHWB98nsAAAAC/snowfall-christmas.gif";
background.style.backgroundImage = `url(${gifUrl})`;
//current location weather forecast
function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName;
  let h3 = document.querySelector("h3");
  h3.innerHTML = `Currently ${temp}°C`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let pressure = document.querySelector("#wind");
  pressure.innerHTML = Math.round(response.data.wind.speed);
}

function currentCoordinates(position) {
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b6445bd31098eb112cb9c393645c865a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentCoordinates);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
//search engine for city weather
function getCoordinates(coordinates) {
  let units = "metric";
  let lat = coordinates.data[0].lat;
  let lon = coordinates.data[0].lon;
  let apiKey = "b6445bd31098eb112cb9c393645c865a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function cityLocation() {
  let inputCity = document.querySelector(".search");
  inputCity = `${inputCity.value}`;
  let key = "b6445bd31098eb112cb9c393645c865a";
  let backEnd =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    inputCity +
    "&appid=b6445bd31098eb112cb9c393645c865a";
  axios.get(backEnd).then(getCoordinates);
}
form.addEventListener("submit", cityLocation);
