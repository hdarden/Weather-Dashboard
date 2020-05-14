//console.log("link")
$(document).ready(function () {
  //========================search bar========================

  var searchBar = JSON.parse(localStorage.getItem("searches")) || [];

  function renderHistory() {
    $("#history").empty();

    for (var i = 0; i < searchBar.length; i++) {
      $("#history").append($("<button class='city'>").text(searchBar[i]));
    }
  }

  $(document).on("click", ".city", function () {
    event.preventDefault();
  });

  renderHistory();

  //========================City, Date, and UV  section=================
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
      console.log(response)
      //var iconOne = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
      //$(".city-place").append(iconOne);
      $(".city-place").text(city);
      $(".city-date").text(currentDateAndTime);
      $(".city-temp").text("Temperature: " + response.main.temp);
      $(".city-humidity").text("Humidity: " + response.main.humidity);
      $(".city-wind").text("Wind speed: " + response.wind.speed);
      

      var tempF = (response.main.temp - 273.15) * 1.8 + 32;

      $(".city-temp").text("Temperature (K) " + response.main.temp);
      $(".city-temp").text("Temperature (F) " + tempF.toFixed(2));
      var lat = response.coord.lat;
      var lon = response.coord.lon; 

    var queryUVURL ="https://api.openweathermap.org/data/2.5/uvi?appid=c7c8128e2f798fa71501452132a9cc27&lat=&" + lat + "&lon=" + lon;

    $.ajax({
      url: queryUVURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
      $(".city-index").text("UV Index: " + response.value);
    });  


    });
  }

  //============================five day forcast=============================================
  function fiveDayForecast(city) {
    var fiveDayURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=c7c8128e2f798fa71501452132a9cc27";

    $.ajax({
      url: fiveDayURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
        
     // var iconOne = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.city.weather[0].icon + ".png")
      //$(".card-day-one").append(iconOne);
      $(".card-temp-one").text("Temp: " + response.list[0].main.temp);
      $(".card-humidity-one").text(
        "Humidity: " + response.list[0].main.humidity
      );

      //var iconOne = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.city.weather[1].icon + ".png")
      //$(".card-day-two").append(iconOne);
      $(".card-temp-two").text("Temp: " + response.list[1].main.temp);
      $(".card-humidity-two").text(
        "Humidity: " + response.list[1].main.humidity
      );

     // var iconOne = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.city.weather[2].icon + ".png")
      //$(".card-day-three").append(iconOne);
      $(".card-temp-three").text("Temp: " + response.list[2].main.temp);
      $(".card-humidity-three").text(
        "Humidity: " + response.list[2].main.humidity
      );

     // var iconOne = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.city.weather[3].icon + ".png")
      //$(".card-day-four").append(iconOne);
      $(".card-temp-four").text("Temp: " + response.list[3].main.temp);
      $(".card-humidity-four").text(
        "Humidity: " + response.list[3].main.humidity
      );

      //var iconOne = $("<img>").attr("src", "http://openweathermap.org/img/wn/" + response.city.weather[4].icon + ".png")
      //$(".card-day-five").append(iconOne);
      $(".card-temp-five").text("Temp: " + response.list[4].main.temp);
      $(".card-humidity-five").text(
        "Humidity: " + response.list[4].main.humidity
      );
     
    }); 
        
  }

  //===============On clicks, sumbit button and city button====================
  $("#search-bar").on("submit", function (event) {
    event.preventDefault();

    var city = $("#city").val().trim();
    //console.log(city)
    searchBar.push(city);

    localStorage.setItem("searchBar", JSON.stringify(searchBar));
    $("#city").val("");
    oneDayForecast(city);
    fiveDayForecast(city);
    //uvIndex();
    renderHistory();
  });

  //could not get this working for clicking city button
  /*  $(".city").on("click", function (e){
  e.preventDefault();
  var town = $(this)
  console.log(town)
  alert("this is the city")
}); */


}) 

