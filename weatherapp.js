// input nume oras
const cityName = document.getElementById('cityName');
// buton creare vremea actuala
const weatherNow = document.getElementById('weatherNow');
// afisare nume oras
let cityData = document.getElementById('date_city');
// data zilei
let dateDay = document.getElementById('date_day');
// descrierea zilei
let desc = document.getElementById('description');
// temperatura zilei
let temp = document.getElementById('temp');
// presiunea zilei
let pressure = document.getElementById('pressure');
// temp min a zilei
let tempMin = document.getElementById('temp_min');
// temp max a zilei
let tempMax = document.getElementById('temp_max');
// umiditatea zilei
let humidity = document.getElementById('humidity');
// iconita descriere
let img_desc = document.getElementById('img_desc');
// card cu vremea
const weatherCard = document.getElementById('weatherCard');
// card cu vremea pe 6 zile
let forecastForSixDays = document.getElementById('forecastForSixDays');
// card cu vremea din 3 in 3 ore
let weatherPerThreeHours = document.getElementById('weather_per_3hours')
// buton creare vreme din 3 in 3 ore
let getWeatherPerThreeHours = document.getElementById('details_per_3hours');

function convertSecToMiliSec(date){
    let currentDate = new Date(date * 1000);
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();
        let year = currentDate.getFullYear();
    return  month + '/' + day + '/' + year;
}

weatherNow.addEventListener('click', setQuery);

function setQuery() {
    if(cityName.value){
        getWeather(cityName.value);
    }
}

function getWeather(query) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=${query}`)
            .then(dataWeather => dataWeather.json())
            .then(data => showWeather(data))
}


function showWeather(dataWeather) {
    // console.log(dataWeather.main.temp_max)
    if (dataWeather.name === undefined) {
        alert("Please, enter a valid city! Thank you.");
    } else {
        weatherCard.style.display = "flex";
        cityData.innerText = `${dataWeather.name},${dataWeather.sys.country}`;
        dateDay.innerText = convertSecToMiliSec(dataWeather.dt);
        desc.innerText = `${dataWeather.weather[0].main}`;
        img_desc.src = `http://openweathermap.org/img/wn/${dataWeather.weather[0].icon}.png`;
        img_desc.style.width = "70px";
        temp.innerText = Math.round(`${dataWeather.main.temp}`);
        pressure.innerText = `${dataWeather.main.pressure}`;
        tempMin.innerText = Math.round(`${dataWeather.main.temp_min}`);
        tempMax.innerText = Math.round(`${dataWeather.main.temp_max}`);
        humidity.innerText = `${dataWeather.main.humidity}`;
    }
}

// buton creare vreme pe 6 zile
const forecastWeather = document.getElementById('showForecastWeather');

const urlForecastWeather = 'https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=';

forecastWeather.addEventListener('click', showForecastWeather);

function showForecastWeather() {
    if(cityName.value === '') {
        alert("Please, enter a valid city! Thank you.")
    }
    let urlForFetching = urlForecastWeather + cityName.value;
    // console.log(urlForFetching); 

    fetch(urlForFetching)
        .then((response) => response.json())
        .then((data) => {
            //  console.log(data.list[0].weather[0].icon);
            let currentDate = new Date(`${data.list[0].dt}` * 1000);
            let month = currentDate.getMonth() +1;
            let today = currentDate.getDate() +1;
            let year = currentDate.getFullYear();

            let forecastWeatherCards = ``;

            for(let j=0; j<6; j++){
                for(let i=0; i<data.list.length ; i++){
                    let currentDate = new Date(`${data.list[i].dt}` * 1000);
                        if(currentDate.getDate() == today){
                            let date = month + "/" + today + "/" + year;
                            forecastWeatherCards += 
                            `
                            <div id="allCards">
                                <div id="weatherForecastCard">
                                    <div id="top_weather_card">
                                        <h2 id="date_city">${cityName.value}</h2>
                                        <h3 id="date_day">${date}</h3>
                                        <div id="img_description"><img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png" id="img_desc" width="70px"></div>
                                        <div id="description">${data.list[i].weather[0].main}</div>
                                    </div>
                                    <div id="weatherCard_details">
                                        <div id="first_row_details">
                                        <div id="temp_date">
                                        <p>Feels like: &nbsp;</p> <span id="temp">${Math.round(data.list[i].main.temp)}</span><p>&#8451;</p>
                                        </div>
                                        <div id="pressure_date">
                                            <p>Pressure: &nbsp;</p> <span id="pressure">${data.list[i].main.pressure}</span>
                                            <img src="./photos/pressure.png" width="25px">
                                        </div>
                                    </div>
                                        <div id="second_row_details">
                                            <div id="temp_min_date">
                                                <p>Temp-min: &nbsp; </p> <span id="temp_min">${Math.round(data.list[i].main.temp_min)}</span> <p>&#8451;</p>
                                                <img src="./photos/temp_min.png" width="25px">
                                            </div>
                                            <div id="temp_max_date">
                                                <p>Temp-max: &nbsp; </p> <span id="temp_max">${Math.round(data.list[i].main.temp_max)}</span> <p>&#8451;</p>
                                                <img src="./photos/temp_max.png" width="25px">
                                            </div>
                                            <div id="humidity_date">
                                                <p>Humidity: &nbsp</p> <span id="humidity">${data.list[i].main.humidity}</span> <p>%</p>
                                                <img src="./photos/humidity.png" width="25px">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            `
                            forecastForSixDays.innerHTML = forecastWeatherCards; 
                            today += 1;
                            // break;
                        }
                    }
                }
            let hourly = document.getElementById("hourly");
            let createHourlyCard =``;
            data.list.forEach(element => {
                let currentDate = new Date(element.dt * 1000);
                let today = currentDate.getDate();
                let hours = currentDate.getHours();
                let date = month+"/"+today+"/"+year;
                if (currentDate.getHours() == hours) {
                    createHourlyCard +=
                    `
                    <div id="three_hours_weather">
                        <p>${date}</p>
                        <div><img src="http://openweathermap.org/img/wn/${element.weather[0].icon}.png" alt=""></div>
                        <div>${currentDate.getHours()}:00</div>
                        <div>${element.main.temp} &#8451</div>
                        <div>${element.weather[0].description}</div>
                    </div>
                    `
                    hourly.innerHTML = createHourlyCard;
                    hourly.style.display = "inline-block";
                    hourly.style.overflowY = "scroll";
            }
        })
    })
}

