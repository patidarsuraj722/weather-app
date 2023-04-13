

const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');
const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const box = document.querySelector('.box');

inputBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkWeather(inputBox.value);
    }
});

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});


function checkWeather(city) {

    box.style.display = "inline-block";
    location_not_found.style.display = "none";
    weather_body.style.display = "none";

    const api_key = "439d4b804bc8187953eb36d2a8c26a02";


    fetch(`https://openweathermap.org/data/2.5/find?q=${city}&appid=${api_key}`, {
        method: 'GET',
        redirect: 'follow'
    })
        .then(response => response.json())
        .then(result => {

            console.log(result);

            if (result.cod === `404`) {
                location_not_found.style.display = "flex";
                weather_body.style.display = "none";
                console.log("error");
                return;
            }

            if (result.list?.length > 0) {
                location_not_found.style.display = "none";
                weather_body.style.display = "flex";
                temperature.innerHTML = `${Math.round(result.list[0].main.temp - 273.15)} °C`;
                description.innerHTML = `${result.list[0].weather[0].description}`;

                humidity.innerHTML = `${result.list[0].main.humidity}%`;
                wind_speed.innerHTML = `${result.list[0].wind.speed}Km/H`;


                switch (result.list[0].weather[0].main) {
                    case 'Clouds':
                        weather_img.src = "./cloud.png";
                        break;
                    case 'Clear':
                        weather_img.src = "./clear.png";
                        break;
                    case 'Rain':
                        weather_img.src = "./rain.png";
                        break;
                    case 'Mist':
                        weather_img.src = "./mist.png";
                        break;
                    case 'Snow':
                        weather_img.src = "./snow.png";
                        break;

                }
            } else {
                location_not_found.style.display = "flex";
                weather_body.style.display = "none";
                console.log("error");
            }

            box.style.display = "none";

        }).catch(error => { console.log('error', error); box.style.display = "none"; });



}
