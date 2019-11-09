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
var searchInput = process.argv.slice(3).join("+");

console.log("Command input: " + userCommand + "   | Search Item: " + searchInput);

// Function to capture user's command and search string, and choose which function to run
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
            console.log("That is not a valid command. Please type one of these commands, followed by the band/musician, song, or movie: \nconcert-this \nspotify-this-song \nmovie-this \ndo-what-it-says")
    }
}

// Call the switch function

userInputs(userCommand, searchInput)


//  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Function to retrieve and display the concert data

function displayConcertData() {
    var queryURL = "https://rest.bandsintown.com/artists/" + searchInput + "/events?app_id=codingbootcamp";
    console.log("queryURL used: " + queryURL);

    axios
        .get(queryURL)
        .then(function (response) {
            for (i = 0; i < response.data.length; i++) {
                var concertDateTime = moment(response.data[i].datetime).format("MM/DD/YYYY, hh:mm a")
                var venue = response.data[i].venue.name;
                var location = response.data[i].venue.city + ", " + response.data[i].venue.region + ", " + response.data[i].venue.country;
                var concertData = "\n==================================\n" + "\n        CONCERT DATA        \n" + "\n==================================\n" + "\nArtist or Band Searched: " + searchInput + "\nConcert Date: " + concertDateTime + "\nVenue or Tour Name: " + venue + "\nLocation: " + location + "\n==================================\n"

                console.log(concertData)

                fs.appendFile("log.txt", concertData, function (error) {
                    if (error) throw error;
                    console.log("Concert Data added to file")
                })
            }
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
        })
}

//  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Function to retrieve  and display the song's data

function displaySongData() {
    var defaultSong = "'The Sign' Ace of Base"
    if (!searchInput) {
        searchInput = defaultSong
    }

    spotify
        .search({ type: 'track', query: searchInput })
        .then(function (response) {
            var songArtist = response.tracks.items[0].album.artists[0].name;
            var songTitle = response.tracks.items[0].name;
            var songUrl = response.tracks.items[0].external_urls.spotify;
            var album = response.tracks.items[0].album.name;
            var songData = "\n==================================\n" + "\n        SONG DATA        \n" + "\n==================================\n" + "\nArtist: " + songArtist + "\nSong Title: " + songTitle + "\nPreview on Spotify: " + songUrl + "\nAlbum: " + album + "\n==================================\n";

            console.log(songData); fs.appendFile("log.txt", songData, function (error) {
                if (error) throw error;
                console.log("Song Data added to file")
            })

        })
        .catch(function (error) {
            console.log(error);
        });
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Function to retrieve  and display the movie's data

function displayMovieData() {
    var defaultMovie = "Mr. Nobody"
    if (!searchInput) {
        searchInput = defaultMovie
        console.log("\n==================================\n" + "\nYou didn't enter a movie. \nIf you haven't watched 'Mr. Nobody,' then you should: http:/www.imdb.com/title/tt0485947/" + "\nIt's on Netflix!" + "\n==================================\n" + "\n==================================" + "\n        MOVIE DATA        " + "\n==================================\n" + "Movie Title:  Mr. Nobody" + "\nYear: 2009" + + "\nIMDB Rating: 7.8/10" + + "\nRotten Tomatoes Rating: 67%" + "\nProduction Country: Belgium, Germany, Canada, France, USA, UK" + "\nLanguage: English, Mohawk" + "\nPlot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible." + "\nActors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham" + "\n=================================="
        )
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

                    fs.appendFile("log.txt", movieData, function (error) {
                        if (error) throw error;
                        console.log("Movie Data added to file")
                    })
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

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // Function to "Do What It Says"

    function displaySomeRandomData() {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }

            var dataArray = data.split(",");
            userCommand = dataArray[0];
            searchInput = dataArray[1];

            userInputs(userCommand, searchInput)
        })
    }
