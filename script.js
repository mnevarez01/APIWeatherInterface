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
        $(".history").append("li");
    }

    function searchWeather(userCity) {
        $.ajax({
            method: "GET",
            URL: "http://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIkey,
            dataType: "json",
            success: function (data) {
                // insert code here
                for (i = 0; i < data.list.length; i++) {
                    if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                        var col = $("<div>").addClass("col-md-2");
                        var card = $("<div>").addClass("col-md-2 card");
                        var body = $("<div>").addClass("col-md-2")
                        var title = $("<h3>").text(userCity);
                        var img = $("<img>").attr({ src: "link", alt: "Weekly Forecast" })
                        var p1 = $("<p>")
                        var p2 = $("<p>")

                        col.append(card.append(body.append(title, img, p1, p2)));

                        $("#forecast .row").append(col);
                    }
                }
            }
        }).then(function (response) {

            console.log(response)
            if (response) {


            } else {


            }


        })




    }

})




















// var APIkey = "25899f976ac10a6f3a73624013195b56";
// var userCity = "Chicago";
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&appid=" + APIkey;
