$(document).ready(function () {
    $("#search-button").on("click", function () {
        var uesrCity = $("#search-value").val();
        $("#search-value").val("")
        searchWeather(uesrCity);
    })

    $(".history").on("click", "li", function () {
        searchWeather($(this).text());

    })
    function makeRow(text) {
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $(".history").append("li");
    }

    function searchWeather(userCity) {
        $.ajax({
            method: "GET",
            URL: "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIkey,
            dataType: "json",
            success: function (data) {
                // insert code here
                for (i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("col-md-2 card");
                        var body = $("<body>").addClass("")
                        var title = $("< >")
                        var img =
                        var p1 =
                        var p2 =

                            col.append(card.append(body.append(title, img, p1, p2)));

                        $("#forecast .row").append(col);
                    }
                }
            }
        })




    }

})




















var APIkey = "25899f976ac10a6f3a73624013195b56";
var userCity = "Chicago";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIkey;
