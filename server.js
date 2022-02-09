// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
const { listen } = require("express/lib/application");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 80;

const server = app.listen(port, () => {
    // callbakc to debug
    console.log(`running on localhost: ${port}`);
});

// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
    res.send(projectData);
});

// Post Route
app.post("/postData", (req, res) => {
    let data = req.body;
    projectData = {
        date: data.date,
        name: data.name,
        temp: data.temp,
        temp_max: data.temp_max,
        temp_min: data.temp_min,
        feels_like: data.feels_like,
        humidity: data.humidity,
        speed: data.speed,
        pressure: data.pressure,
        content: data.content,
    };
    res.send(projectData);
});
