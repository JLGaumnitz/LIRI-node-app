// Read and set environment variables
require("dotenv").config();


// Set up required modules
var fs = require("fs");
var keys = require("./keys.js");

// Installed from npm
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Variables to capture user input
var userCommand = process.argv[2];
var searchInput = process.argv[3];

console.log("Command input: " + userCommand + " Search Item: " + searchInput);

// Function to take user's command and search string and choose which function to run
function userInputs(userCommand, searchInput) {
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
            displaySomeRandomData();
            break;
        default:
            console.log("That is not a valid command. Please type one of these commands, followed by the band/musician, song, or movie you want information about (in quotation marks): \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

// Call the switch function

userInputs(userCommand, searchInput)


// // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Function to retrieve concert data and display the next concert information
function displayConcertData() {
    var queryURL = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp";
    console.log("queryURL used: " + queryURL);

    axios
        .get(queryURL)
        .then(function (response) {
            var nextConcertDateTime = moment(response.data[0].datetime).format("MM/DD/YYYY, hh:mm a")
            var venue = response.data[0].venue.name;
            var location = response.data[0].venue.city + ", " + response.data[0].venue.region + ", " + response.data[0].venue.country;
            var concertData = "\n==================================\n" + "\n        CONCERT DATA        \n" + "\n==================================\n" + "\nArtist or Band Searched: " + searchInput + "\nNext concert: " + nextConcertDateTime + "\nVenue or Tour Name: " + venue + "\nLocation: " + location + "\n==================================\n"

            console.log(concertData)
        })
        // To handle errors (code from Class Folder 10-NodeJS/Activity 18)
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
// displayConcertData()

// // // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// // Function to retrieve song data and display the song's information

function displaySongData() {
    if (searchInput === undefined) {
        searchInput = "'The Sign' Ace of Base";
    }

    spotify
        .search({ type: 'track', query: searchInput })
        .then(function (response) {
            var songArtist = response.tracks.items[0].album.artists[0].name;
            var songTitle = response.tracks.items[0].name;
            var songUrl = response.tracks.items[0].external_urls.spotify;
            var album = response.tracks.items[0].album.name;
            var songInfo = "\n==================================\n" + "\n        SONG DATA        \n" + "\n==================================\n" + "\nArtist: " + songArtist + "\nSong Title: " + songTitle + "\nPreview on Spotify: " + songUrl + "\nAlbum: " + album + "\n==================================\n";

            console.log(songInfo);
        })
        .catch(function(error) {
          console.log(error);
        });
}
// displaySongData()

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Function to retrieve movie data and display the movie's information

function displayMovieData() {
    if (searchInput === undefined) {
        searchInput = "Mr. Nobody";
        console.log("\n==================================\n" + "\nYou didn't enter a movie. \nIf you haven't watched 'Mr. Nobody,' then you should: http:/www.imdb.com/title/tt0485947/" + "\nIt's on Netflix!" + "\n==================================\n")
    }
    else {
        var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + searchInput + "&type=movie";
        console.log("queryURL used: " + queryURL);
        axios
            .get(queryURL)
            .then(function (response) {
                var movieTitle = response.data.Title;
                var movieYear = response.data.Year;
                var imdbMovieRating = response.data.Ratings[0].Value;
                var rottenTomatoesMovieRating = response.data.Ratings[1].Value;
                var countryMovieProduced = response.data.Country;
                var movieLanguage = response.data.Language;
                var moviePlot = response.data.Plot;
                var movieActors = response.data.Actors;

                var movieData = "\n==================================\n" + "\n        MOVIE DATA        \n" + "\n==================================\n" + "Movie Title: " + movieTitle + "\nYear: " + movieYear + "\nIMDB Rating: " + imdbMovieRating + "\nRotten Tomatoes Rating: " + rottenTomatoesMovieRating + "\nProduction Country: " + countryMovieProduced + "\nLanguage: " + movieLanguage + "\nPlot: " + moviePlot + "\nActors: " + movieActors + "\n==================================\n"

                console.log(movieData);
            })
            // To handle errors (code from Class Folder 10-NodeJS/Activity 18)
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
}
// displayMovieData()

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Function to "Do What It Says"

function displaySomeRandomData() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArray = data.split(",");
        userCommand = dataArray[0];
        searchInput = dataArray[1];

        if (userCommand === "concert-this") {
            displayConcertData();
        }
        else if (userCommand === "spotify-this-song") {
            displaySongData();
        }
        else if (userCommand === "movie-this") {
            displayMovieData();
        }
    })
}
// displaySomeRandomData()
