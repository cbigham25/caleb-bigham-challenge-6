const mainCityTitle = $(".mainCity-title");
const mainCityTemp = $(".mainCity-temp");
const mainCityWind = $(".mainCity-wind");
const mainCityHum = $(".mainCity-humidity");
const firstHeader = $(".first-day-header");
const recentsButton = $(".recents-button");

var cityCounter = 0;
const city1 = localStorage.getItem("city1");
const city2 = localStorage.getItem("city2");
const city3 = localStorage.getItem("city3");
const city4 = localStorage.getItem("city4");
const city5 = localStorage.getItem("city5");

if (city1) {
    $('.recents-button-container').append('<button class="recents-button">' + city1 + '</button>');
}
if (city2) {
    $('.recents-button-container').append('<button class="recents-button">' + city2 + '</button>');
}
if (city3) {
    $('.recents-button-container').append('<button class="recents-button">' + city3 + '</button>');
}
if (city4) {
    $('.recents-button-container').append('<button class="recents-button">' + city4 + '</button>');
}
if (city5) {
    $('.recents-button-container').append('<button class="recents-button">' + city5 + '</button>');
}



const date = new Date();
let day = ('0' + (date.getDate() + 1)).slice(-2);
let month = ('0' + (date.getMonth() + 1)).slice(-2);
let year = date.getFullYear();
let parsedDate = `${year}-${month}-${day}`;

var firstDate = new Date();
firstDate.setDate(firstDate.getDate() + 1);
let firstDay = ('0' + (firstDate.getDate() + 1)).slice(-2);
let firstMonth = ('0' + (firstDate.getMonth() + 1)).slice(-2);
let parsedFirstDate = `${firstMonth}-${firstDay}`;

var secondDate = new Date();
secondDate.setDate(secondDate.getDate() + 2);
let secondDay = ('0' + (secondDate.getDate() + 1)).slice(-2);
let secondMonth = ('0' + (secondDate.getMonth() + 1)).slice(-2);
let parsedSecondDate = `${secondMonth}-${secondDay}`;

var thirdDate = new Date();
thirdDate.setDate(thirdDate.getDate() + 3);
let thirdDay = ('0' + (thirdDate.getDate() + 1)).slice(-2);
let thirdMonth = ('0' + (thirdDate.getMonth() + 1)).slice(-2);
let parsedThirdDate = `${thirdMonth}-${thirdDay}`;

var fourthDate = new Date();
fourthDate.setDate(fourthDate.getDate() + 4);
let fourthDay = ('0' + (fourthDate.getDate() + 1)).slice(-2);
let fourthMonth = ('0' + (fourthDate.getMonth() + 1)).slice(-2);
let parsedFourthDate = `${fourthMonth}-${fourthDay}`;

var fifthDate = new Date();
fifthDate.setDate(fifthDate.getDate() + 5);
let fifthDay = ('0' + (fifthDate.getDate() + 1)).slice(-2);
let fifthMonth = ('0' + (fifthDate.getMonth() + 1)).slice(-2);
let parsedFifthDate = `${fifthMonth}-${fifthDay}`;

console.log(date);
console.log(parsedDate);
console.log(parsedFirstDate);
console.log(parsedSecondDate);
console.log(parsedThirdDate);
console.log(parsedFourthDate);
console.log(parsedFifthDate);

$(document).ready(function () {
    $(".submitButton").on("click", function (event) {

        event.preventDefault();
        var searchedCity = $("#searchCity").val();
        var url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=08e36a59e35d73a28538b6751ed8aa61`;
        return new Promise((resolve, reject) => {
            fetch(url, {}).then((response) => {

                return response.json();

            }).then((data) => {
                let lat = data[0].lat;
                let lon = data[0].lon;
                console.log("lat: " + lat + "lon: " + lon);
                console.log(data);
                var fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=08e36a59e35d73a28538b6751ed8aa61`;

                fetch(fiveDayUrl, {}).then((response) => {

                    return response.json();

                }).then((data) => {
                    cityCounter++;
                    mainCityTitle.text(data.city.name);
                    localStorage.setItem(`city${cityCounter}`, data.city.name);
                    $('.recents-button-container').append('<button class="recents-button">' + data.city.name + '</button>');

                    mainCityTemp.text("Temprature: " + Math.round(data.list[0].main.temp) + `°F`);
                    mainCityWind.text("Wind Speed: " + Math.round(data.list[0].wind.speed) + ` MPH`);
                    mainCityHum.text("Humidity: " + data.list[0].main.humidity + `%`);
                    let iconcode = data.list[0].weather[0].icon;
                    var iconurl = `http://openweathermap.org/img/w/${iconcode}.png`;
                    $('#wicon').attr('src', iconurl);

                    for (i = 0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt.includes(parsedFirstDate)) {
                            $('.first-header').text(parsedFirstDate);
                            $('.first-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.first-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.first-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-first').attr('src', iconurl);
                        }
                        else if (data.list[i].dt_txt.includes(parsedSecondDate)) {
                            $('.second-header').text(parsedSecondDate);
                            $('.second-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.second-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.second-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-second').attr('src', iconurl);
                        }
                        else if (data.list[i].dt_txt.includes(parsedThirdDate)) {
                            $('.third-header').text(parsedSecondDate);
                            $('.third-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.third-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.third-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-third').attr('src', iconurl);
                        }
                        else if (data.list[i].dt_txt.includes(parsedFourthDate)) {
                            $('.fourth-header').text(parsedSecondDate);
                            $('.fourth-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.fourth-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.fourth-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-fourth').attr('src', iconurl);
                        }
                        else if (data.list[i].dt_txt.includes(parsedFifthDate)) {
                            $('.fifth-header').text(parsedSecondDate);
                            $('.fifth-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.fifth-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.fifth-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-fifth').attr('src', iconurl);
                        }
                    }

                    console.log(data);
                    console.log(data.list[0].dt_txt === `${parsedDate} 03:00:00`);
                    console.log();
                })


            }).catch((error) => {
                reject(error);
            });
        });
    })

    recentsButton.on("click", function (event) {

        event.preventDefault();
        var searchedCity = recentsButton.text();
        var url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchedCity}&limit=5&appid=08e36a59e35d73a28538b6751ed8aa61`;
        return new Promise((resolve, reject) => {
            fetch(url, {}).then((response) => {

                return response.json();

            }).then((data) => {
                let lat = data[0].lat;
                let lon = data[0].lon;
                console.log("lat: " + lat + "lon: " + lon);
                console.log(data);
                var fiveDayUrl = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=08e36a59e35d73a28538b6751ed8aa61`;

                fetch(fiveDayUrl, {}).then((response) => {

                    return response.json();

                }).then((data) => {
                    cityCounter++;
                    mainCityTitle.text(data.city.name);

                    localStorage.setItem(`city${cityCounter}`, data.city.name);
                    for (i = 0; i < cityCounter; i++) {
                        if (!($(".city" + i).text().includes(recentsButton.text()))) {
                            $('.recents-button-container').append(`<button class="recents-button" city${cityCounter}>` + data.city.name + '</button>');
                        }
                    }
                    mainCityTemp.text("Temprature: " + Math.round(data.list[0].main.temp) + `°F`);
                    mainCityWind.text("Wind Speed: " + Math.round(data.list[0].wind.speed) + ` MPH`);
                    mainCityHum.text("Humidity: " + data.list[0].main.humidity + `%`);
                    let iconcode = data.list[0].weather[0].icon;
                    var iconurl = `http://openweathermap.org/img/w/${iconcode}.png`;
                    $('#wicon').attr('src', iconurl);

                    for (i = 0; i < data.list.length; i++) {
                        if (data.list[i].dt_txt.includes(parsedFirstDate)) {
                            $('.first-header').text(parsedFirstDate);
                            $('.first-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.first-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.first-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-first').attr('src', iconurl);
                        }
                        else if (data.list[i].dt_txt.includes(parsedSecondDate)) {
                            $('.second-header').text(parsedSecondDate);
                            $('.second-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.second-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.second-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-second').attr('src', iconurl);
                        }
                        else if (data.list[i].dt_txt.includes(parsedThirdDate)) {
                            $('.third-header').text(parsedSecondDate);
                            $('.third-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.third-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.third-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-third').attr('src', iconurl);
                        }
                        else if (data.list[i].dt_txt.includes(parsedFourthDate)) {
                            $('.fourth-header').text(parsedSecondDate);
                            $('.fourth-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.fourth-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.fourth-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-fourth').attr('src', iconurl);
                        }
                        else if (data.list[i].dt_txt.includes(parsedFifthDate)) {
                            $('.fifth-header').text(parsedSecondDate);
                            $('.fifth-temp').text(Math.round(data.list[i].main.temp) + `°F`);
                            $('.fifth-wind').text(Math.round(data.list[i].wind.speed) + ` MPH`);
                            $('.fifth-hum').text(data.list[i].main.humidity + `%`);
                            let iconcode = data.list[i].weather[0].icon;
                            var iconurl = `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
                            $('#wicon-fifth').attr('src', iconurl);
                        }
                    }

                    console.log(data);
                    console.log(data.list[0].dt_txt === `${parsedDate} 03:00:00`);
                    console.log();
                }


                )
            }).catch((error) => {
                reject(error);
            });
        });
    })
});
