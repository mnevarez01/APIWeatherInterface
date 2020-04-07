var APIkey = "25899f976ac10a6f3a73624013195b56"


$(document).ready(function () {

    $("#search-button").on("click", function () {
        var userCity = $("#search-value").val();
        $("#search-value").val("")
        searchWeather(userCity);
    })

    $(".history").on("click", "li", function () {
        searchWeather($(this).text());

    })
    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append(li);
    }

    function searchWeather(userCity) {
        $.ajax({
            method: "GET",
            url: "http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIkey + "&units=imperial",
            dataType: "json",
            success: function (data) {
                if (history.indexOf(userCity) === -1) {
                    history.push(userCity)
                    window.localStorage.setItem("history", JSON.stringify(history))
                    makeRow(userCity);
                }
                $("#today").empty();
                var card = $("<div>").addClass("card")
                var title = $("<h4>").text("City: " + userCity)
                var wind = $("<div>").addClass("card-text").text("Wind Speed: " + data.wind.speed)
                var humid = $("<div>").addClass("card-text").text("Humidity: " + data.main.humidity)
                var temp = $("<div>").addClass("card-text").text("Temperature: " + data.main.temp)
                var cardBody = $("<div>").addClass("card-body")
                var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png")
                cardBody.append(title, temp, humid, wind, img);
                card.append(cardBody);
                $("#today").append(card);
                getForecast(userCity);
            }
        })

    }

    function getForecast(userCity) {
        console.log("it worked!")
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + userCity + "&appid=" + APIkey + "&units=imperial",
            dataType: "json",
            success: function (data) {
                $("#forecast").html("<h4 class=\"mt-3\">5-Day Forecast:</h4>").append("<div class=\"row\">");
                for (i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2")
                        // var title = $("<h3>").text(userCity);
                        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                        var p1 = $("<p>").addClass("card-text").text("Temperature: " + data.list[i].main.temp_max)
                        var p2 = $("<p>").addClass("card-text").text("Humidity " + data.list[i].main.humidity)

                        col.append(card.append(body.append(img, p1, p2)));

                        $("#forecast .row").append(col);
                    }
                }
            }

        })
    }
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    if (history.length < 0) {
        searchWeather(history[history.length - 1]);
    }
    for (var i = 0; i < history.length; i++) {
        makeRow(history[i]);
    }


})



















