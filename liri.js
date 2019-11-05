// Read and set environment variables
require("dotenv").config();


// Set up required modules

var fs = require("fs");
var keys = require("./keys.js");
// installed from npm
var axios = require("axios");
var moment = require("moment")
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Variables to capture user input

var userCommand = process.argv[2];
var searchInput = process.argv[3];

console.log(userCommand, searchInput);

// Function to take user's command and search string and choose which function to run
function UserInputs(userCommand, searchInput) {
    switch (userCommand) {
        case "concert-this":
            displayConcertData(searchInput);
            break;
        case "spotify-this-song":
            displaySongData(searchInput);
            break;
        case "movie-this":
            displayMovieData(searchInput);
            break;
        case "do-what-it-says":
            displaySomeData();
            break;
        default:
            console.log("That is not a valid option. Please type one of these commands, followed by the concert, song, or movie you want information about (in quotation marks): \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

// Function to retrieve concert data and display the next concert information
function displayConcertData() {
    var queryURL = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp"; 
        console.log("queryURL used: " + queryURL);

    axios
        .get(queryURL)
        .then(function(response) {
            var nextConcertDateTime = moment(response.data[0].datetime).format("MM/DD/YYYY, hh:mm a")
            var venue = response.data[0].venue.name;
            var location = response.data[0].venue.city +", " + response.data[0].venue.region + ", " +response.data[0].venue.country;
            var concertData = "\n==================================\n" + "Next concert: " + nextConcertDateTime + "\nVenue or Tour Name: " + venue + "\nLocation: " + location + "\n==================================\n"

            console.log(concertData)
        })
        // To handle errors (from Class Activity 10-NodeJS/18)
        .catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}
displayConcertData()

// userInputs(userCommand, searchInput)