const form = document.querySelector("#search-form");
const city = document.querySelector(".city");
const date = document.querySelector(".date");
const temp = document.querySelector(".temp");
const weather = document.querySelector(".weather");

//live clock bro!
function time() {
  var today = new Date();
  var calendarDate =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = calendarDate + " @ " + time;
  date.textContent = `${dateTime}`;
}
setInterval(time, 1000);

//search function and update content!
form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const apiKey = "00g6jLhrd8sme7PiaeXS3F9ztyvKmPk9";
  const searchInput = form.elements.query.value;
  const locationSearch = await axios.get(
    `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${apiKey}&q=${searchInput}`
  );
  const locationKey = locationSearch.data[0].Key;
  const weatherResult = await axios.get(
    `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${apiKey}`
  );
  city.textContent = `${locationSearch.data[0].EnglishName}, ${locationSearch.data[0].AdministrativeArea.EnglishName}`;
  temp.textContent = `${weatherResult.data[0].Temperature.Imperial.Value} °F`;
  weather.textContent = `${weatherResult.data[0].WeatherText}`;
});
