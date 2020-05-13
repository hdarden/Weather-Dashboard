//console.log("link")
$(document).ready(function(){
    console.log("link") 
//search bar========================

var searchBar = JSON.parse(localStorage.getItem("searches")) || [];

    function renderHistory(){
        $("#history").empty();

        for(var i = 0; i < searchBar.length; i ++){
            $("#history").append($("<p class= 'city'>").text(searchBar[i]));

        }
    }

    $("#search-bar").on("submit",function(event) {
        event.preventDefault();

        var city = $("#city").val().trim();
        searchBar.push(city);

        localStorage.setItem("searchBar", JSON.stringify(searchBar));

        $("#city").val("");

        renderHistory();
    });

    $(document).on("click", ".city", function(){
        console.log($(this).text());
    })

    renderHistory();

})