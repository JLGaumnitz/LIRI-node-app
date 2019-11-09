# LIRI-node-app
created by Jennifer Gaumnitz

LIRI Bot demo video: https://drive.google.com/open?id=1jETqP6aYdw-Svrv-ZdldduHTitS6PJwt

GitHub repository: https://github.com/JLGaumnitz/LIRI-node-app

LIRI (Language Interpretation and Recognition Interface) is a command line node app that takes in parameters, searches  the Bands in Town API for concerts, the Spotify API for songs, and the OMDB API for movies, and gives back data to be displayed and logged.

There are four commands that can be entered: "concert-this," "spotify-this-song," "movie-this," and "do-what-it-says." The user enters the desired command, followed by either a band/musician, song, or movie that he or she is wanting information about. 

The "concert-this" command queries the Bands In Town API and returns the following upcoming concert information: Venue or Tour Name, Venue Location, and Date of the Event. The moment npm is used to format the date and time as "MM/DD/YYYY; h:mm a." The returned information is displayed in the console and also logged to a log.txt file. For this assignment, I used the class Bands in Town API key.

The "spotify-this-song" command uses the node-spotify-api npm to query the Spotify API and return the following information about a song: Artist(s), Song Title, URL for the song preview on Spotify, and Album Title. If the user does not input a song, the default song is "The Sign" by Ace of Base. The returned information is displayed in the console and also logged to a log.txt file. The Spotify API requires a user to sign up as a developer to generate the needed credentials (client ID and client secret). My Spotify client ID and client secret are in a file (.env) that is not committed to GitHub and therefore are kept private. If anyone wishes to clone this app from GitHub, they would need to supply their own .env file for it to work.

The "movie-this" command queries the OMDB API and returns the following information about a movie: Title, Year Released, IMDB Rating, Rotten Tomatoes Rating, Country of Production, Language, Plot, and Actors. If the user does not input a movie, the default movie is "Mr. Nobody." The returned information is displayed in the console and also logged to a log.txt file. For this assignment, I used the class OMDB API key.

The "do-what-it-says" command uses the fs node package to read the text inside the random.txt file and uses that information to call one of LIRI's commands. In the demo video, it was set to run "spotify-this-song" for "I Want It That Way." I also tested it by changing the random.txt file to include movie-this and "An Affair to Remember" and concert-this and "Lauren Daigle" (screenshots of those results are below). The returned information is displayed in the console and also logged to a log.txt file.

![Image of do-what-it-says as movie-this](.\images\do-what-it-says-movie-this-an-affair-to-remember.PNG)

![Image of do-what-it-says as concert-this](.\images\do-what-it-says-concert-this-lauren-daigle.PNG)

WHY THE PROJECT IS USEFUL

  The app fulfills a homework assignment for University of Kansas Coding Boot Camp, August 2019 to February 2020. Besides allowing me to continue working with Node.js, the assignment also taught me to work with three new APIs (Spotify, OMDB, and Bands In Town) and several third-party npm packages (axios, dotenv, moment, and node-spotify-api).


HOW YOU CAN GET STARTED WITH THE PROJECT

   For this command line node app, you will need to install the third-party npm packages (axios, dotenv, moment, and node spotify.api). You will also need your own Spotify creator id and creator secret, and you will need to create an .env file. Once you have the app prepared, type "node liri.js" in the command line, followed by one of the four commands explained above and then a band/musician, song, or movie.

WHERE USERS CAN GET HELP WITH THE PROJECT

  Questions? Contact Jennifer Gaumnitz at jlgaumnitz@gmail.com

WHO MAINTAINS AND CONTRIBUTES TO THE PROJECT

  Jennifer Gaumnitz created the project. I probably will not update it again after completing this assignment. 
