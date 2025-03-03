const apiKey = "60d426a37932d9ebc69290e747c133ae";
const bar = document.querySelector(".search");
const ic = document.querySelector("#icon");
const name = document.querySelector(".country");
const de = document.querySelector(".desc");
const te = document.querySelector(".temparature");
const humm = document.querySelector("#per1");
const hu = document.querySelector("#per");
const foredates = document.querySelectorAll(".dates");
const fdesc = document.querySelectorAll(".fdes");
const forecastBlocks = document.querySelectorAll(".fore");
 const topp=document.querySelector(".date");
ic.addEventListener("click", () => {
    getWeather(bar.value);
})


async function getWeather(city) {
    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        const response = await fetch(weatherUrl);
        const response1 = await fetch(forecastUrl);
        const weatherData = await response.json();
        const forecastData = await response1.json();
        if (response.ok && response1.ok) {
            const date = new Date(weatherData.dt*1000);
            const day = date.getDay();
            const month = date.getMonth();
            const dayOfMonth = date.getDate();
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            name.innerText = weatherData.name;
            de.innerHTML = `<h3>${weatherData.weather[0].description}</h3>`;
            te.innerHTML = `<h3>${weatherData.main.temp}°C</h3>`;
            humm.innerText = `${weatherData.main.humidity}%`;
            hu.innerText = `${weatherData.wind.speed}M/s`;
            topp.innerText = `${days[day]}, ${dayOfMonth} ${months[month]}`;
            foredates.forEach((value, index) => {
                const timestamp = weatherData.dt * 1000 + 86400000 * index;
                const date = new Date(timestamp);
                const day = date.getDay();
                const month = date.getMonth();
                const dayOfMonth = date.getDate();
                const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                value.innerText = `${days[day]}, ${dayOfMonth} ${months[month]}`;
                fdesc[index].innerText = `${forecastData.list[index].weather[0].description}`;
               

            });
            forecastBlocks.forEach((forecastBlock, index) => {
                forecastBlock.addEventListener("click", () => {
                    const forecast = forecastData.list[index];
                    name.innerText = forecastData.city.name;
                    de.innerHTML = `<h3>${forecast.weather[0].description}</h3>`;
                    te.innerHTML = `<h3>${forecast.main.temp}°C</h3>`;
                    humm.innerText = `${forecast.main.humidity}%`;
                    hu.innerText = `${forecast.wind.speed} m/s`;
                    const date = new Date(forecastData.list[index].dt*1000);
                    const day = date.getDay();
                    const month = date.getMonth();
                    const dayOfMonth = date.getDate();
                    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    console.log(`${days[day]}, ${dayOfMonth} ${months[month]}`);
                    topp.innerText = `${days[day]}, ${dayOfMonth} ${months[month]}`;
                    
                });
            });

        } else {
            console.error(`Error: ${weatherData.message}`);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }


}


