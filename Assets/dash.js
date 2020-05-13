//console.log("link")

//search bar========================

var searchBar = JSON.parse(localStorage.getItem("searches")) || [];

    function renderHistory(){
        $("#history").empty();

        for(var i = 0; i < searchBar.length; i ++){
            $("#history").append($("<p class= 'city'>").text(searchBar[i]));

        }
    }