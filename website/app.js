/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip="; // Base URL
const apiKey = "&appid=54f6d8e2a8216326196ac8f1641bea7a&units=imperial"; // Personal API Key for OpenWeatherMap API
const zipCode = document.getElementById("zip"); // select Zip Input Element
const feelings = document.getElementById("feelings"); // select feelings Input Element
const submitBtn = document.getElementById("generate"); // select submit button
const date = document.getElementById("date"); // select entered date
const temp = document.getElementById("temp"); // select entered temperature
const content = document.getElementById("content"); // select entered content
const city = document.getElementById("city"); // select fetched city
const feelsLike = document.getElementById("feels-like"); // select feels like temperature
const humidity = document.getElementById("humidity"); // select humidity
const pressure = document.getElementById("pressure"); // select pressure
const tempMax = document.getElementById("tempMax"); // select max temp
const tempMin = document.getElementById("tempMin"); // select min temp
const windSpeed = document.getElementById("wind-speed"); // select wind speed
const userCont = content.value;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "-" + d.getDate() + "-" + d.getFullYear(); // added +1 because i kept getting the wrong month

// Event listener to add function to existing HTML DOM element
submitBtn.addEventListener("click", performAction);

/* Function called by event listener */
function performAction() {
    const userFeelings = feelings.value;
    const userZipCode = zipCode.value;

    getWeatherInfo(baseURL, userZipCode, apiKey)
        .then((data) => {
            console.log(data);
            postData("/postData", {
                date: newDate,
                name: data.name,
                temp: data.main.temp,
                temp_max: data.main.temp_max,
                temp_min: data.main.temp_min,
                feels_like: data.main.feels_like,
                humidity: data.main.humidity,
                speed: data.wind.speed,
                pressure: data.main.pressure,
                userFeelings,
            });
        })
        .then(retrieveData());
}

/* Function to GET Web API Data*/
const getWeatherInfo = async (baseURL, userZipCode, apiKey) => {
    const res = await fetch(baseURL + userZipCode + apiKey);
    try {
        const userInput = await res.json();
        return userInput;
    } catch (error) {
        console.log("error", error);
    }
};
/* Function to POST data */
const postData = async (url = "", data = {}) => {
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};
/* Function to GET Project Data */
const retrieveData = async () => {
    const req = await fetch("/all");
    try {
        // Transform into JSON
        const allData = await req.json();
        console.log(allData);
        // Write updated data to DOM elements
        const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;
        temp.innerHTML =
            "Temperature: " +
            Math.round(allData.temp) +
            "°F" +
            " / " +
            Math.round(fahrenheitToCelsius(Math.round(allData.temp))) +
            "°C";
        tempMax.innerHTML =
            "Max Temp: " +
            Math.round(allData.temp_max) +
            "°F" +
            " / " +
            Math.round(fahrenheitToCelsius(Math.round(allData.temp_max))) +
            "°C";
        tempMin.innerHTML =
            "Min Temp: " +
            Math.round(allData.temp_min) +
            "°F" +
            " / " +
            Math.round(fahrenheitToCelsius(Math.round(allData.temp_min))) +
            "°C";
        feelsLike.innerHTML =
            "Feels Like: " +
            Math.round(allData.feels_like) +
            "°F" +
            " / " +
            Math.round(fahrenheitToCelsius(Math.round(allData.feels_like))) +
            "°C";
        humidity.innerHTML = "Humidity: " + allData.humidity + "%";
        windSpeed.innerHTML =
            "Wind: " +
            Math.round(allData.speed) +
            "mph" +
            " / " +
            Math.round(allData.speed * 1.609) +
            "kmh";
        pressure.innerHTML = "Pressure: " + allData.pressure + "hPa";
        content.innerHTML = "Feeling: " + feelings.value;
        date.innerHTML = "Date: " + newDate;
        city.innerHTML = "City: " + allData.name;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};
