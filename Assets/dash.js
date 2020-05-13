//console.log("link")
$(document).ready(function () {
  //search bar========================

  var searchBar = JSON.parse(localStorage.getItem("searches")) || [];

  function renderHistory() {
    $("#history").empty();

    for (var i = 0; i < searchBar.length; i++) {
      $("#history").append($("<p class= 'city'>").text(searchBar[i]));
    }
  }

  $("#search-bar").on("submit", function (event) {
    event.preventDefault();

    var city = $("#city").val().trim();
    searchBar.push(city, citySearched);

    localStorage.setItem("searchBar", JSON.stringify(searchBar));

    $("#city").val("");

    renderHistory();
  });

  $(document).on("click", ".city", function () {
    console.log($(this).text());
  });

  renderHistory();
});

//City and Date section=================
var citySearched = ""; //need to figure out how to push value of city searched to this string
var queryURL =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  citySearched +
  "&appid=c7c8128e2f798fa71501452132a9cc27";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  console.log(queryURL);
  console.log(response);
  
  //need to generate the date
  $(".city-date").text(citySearched + "date");
  $(".city-temp").text("Temperature: " + response.main.temp);
  $(".city-humidity").text("Humidity: " + response.main.humidity);
  $(".city-wind").text("Wind speed: " + response.wind.speed);
  //$(".city-index").text("UV Index: " + response.);

  var tempF = (response.main.temp - 273.15) * 1.8 + 32;

  $(".city-temp").text("Temperature (K) " + response.main.temp);
  $(".city-temp").text("Temperature (F) " + tempF.toFixed(2));
});
