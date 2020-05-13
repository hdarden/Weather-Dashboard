//console.log("link")
$(document).ready(function () {
  //========================search bar========================

  var searchBar = JSON.parse(localStorage.getItem("searches")) || [];

  function renderHistory() {
    $("#history").empty();

    for (var i = 0; i < searchBar.length; i++) {
      //$("#history").append($("<button class='city'>").text(searchBar[i]));
      var cityBtn = $("<button>");
      cityBtn.attr("class", "cityBtn");
      cityBtn.text(searchBar[i]);
      $("#history").append(cityBtn);
    }
  }

  $(".cityBtn").click(function () {
    console.log("yay");
  });

  $(document).on("click", ".city", function () {
    event.preventDefault();
  });

  renderHistory();

 
  //========================City and Date section=================
  var currentDateAndTime = Date(Date.now());

  function oneDayForecast(city) {
    console.log(city);
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=c7c8128e2f798fa71501452132a9cc27";
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $(".city-place").text(city);
      //need to add weather icon to current date
      $(".city-date").text(currentDateAndTime);
      $(".city-temp").text("Temperature: " + response.main.temp);
      $(".city-humidity").text("Humidity: " + response.main.humidity);
      $(".city-wind").text("Wind speed: " + response.wind.speed);
      //$(".city-index").text("UV Index: " + response.);

      var tempF = (response.main.temp - 273.15) * 1.8 + 32;

      $(".city-temp").text("Temperature (K) " + response.main.temp);
      $(".city-temp").text("Temperature (F) " + tempF.toFixed(2));
    });
  }

  //============================five day forcast=============================================
  
  //var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="+ city +"&appid=c7c8128e2f798fa71501452132a9cc27";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast?q=charlotte&appid=c7c8128e2f798fa71501452132a9cc27";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    $(".card-day-one").text(currentDateAndTime);
    //$(".card-icon-one").attr("img")
    $(".card-temp-one").text("Temp: " + response.list[0].main.temp);
    $(".card-humidity-one").text("Humidity: " + response.list[0].main.humidity);

    $(".card-day-two").text(currentDateAndTime);
    //$(".card-icon-two").attr("img")
    $(".card-temp-two").text("Temp: " + response.list[1].main.temp);
    $(".card-humidity-two").text("Humidity: " + response.list[1].main.humidity);

    $(".card-day-three").text(currentDateAndTime);
    //$(".card-icon-three").attr("img")
    $(".card-temp-three").text("Temp: " + response.list[2].main.temp);
    $(".card-humidity-three").text(
      "Humidity: " + response.list[2].main.humidity
    );

    $(".card-day-four").text(currentDateAndTime);
    //$(".card-icon-four").attr("img")
    $(".card-temp-four").text("Temp: " + response.list[3].main.temp);
    $(".card-humidity-four").text(
      "Humidity: " + response.list[3].main.humidity
    );

    $(".card-day-five").text(currentDateAndTime);
    //$(".card-icon-five").attr("img")
    $(".card-temp-five").text("Temp: " + response.list[4].main.temp);
    $(".card-humidity-five").text(
      "Humidity: " + response.list[4].main.humidity
    );
  });

  //==============================UV Index================================
  /*var citySearched = "";
var lat = "";
var lon = ""; 
var queryUvURL ="https://api.openweathermap.org/data/2.5/uvi?appid=c7c8128e2f798fa71501452132a9cc27&lat=&" + lat + "lon=" + lon;

$.ajax({
  url: queryUvURL,
  method: "GET",
}).then(function (response) {
console.log(response);


});  */
  $("#search-bar").on("submit", function (event) {
    event.preventDefault();

    var city = $("#city").val().trim();
    //console.log(city)
    searchBar.push(city);

    localStorage.setItem("searchBar", JSON.stringify(searchBar));
    $("#city").val("");
    oneDayForecast(city);
    renderHistory();
  });

  $(".city").on("click", function (e) {
    e.preventDefault();
    /*var town = $(this)
  console.log(town)*/
    alert("this is the city");
  });
});
