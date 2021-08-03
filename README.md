# Spotifly

## Intro
Welcome to Spotifly (Get it? Like Spotify but fly? Sorry, I'll leave now)! This web application is coded with javascript, html, css, expressjs, and react. It's also my first stint with making a webapp with js, so please don't judge me too hard. Now, you're probably wondering why I think this is a bit more fly than Spotify. Spotify has a native integration with Genius Lyrics which is pretty nice. However, Genius lyrics only appear on some songs. Even worse, it doesn't show me all the lyrics and gives me information about the song. That's cool and all, but how am I supposed to carpool karaoke? So essentially, this webapp allows you to look up a Spotify song, play it, and display the lyrics from a lyrics api. A few nifty things you may notice: the search bar is dynamic and makes suggestions as you type, you can actually use the Spotify player on the webapp and play Spotify to other devices like a speaker as you would with your phone, the lyrics are of course displayed with no fancy Genius explanations, and ALL of my comments (including the stupid ones, deal with it) line the code.

## Installation and Running
You'll need a Spotify account and the most recent node.js installed. Clone down from this GitHub link into your projects folder. npm install in the parent folder to install dependencies. If everything goes correctly, you should be able to run the webapp. Go to your ide or editor's terminal. cd into the server folder and run npm run devStart. This runs a script that fires up the express servers which use Nodemon. Using Nodemon as a dev dependency means that the server will automatically restart if changes are made (convenient, right?) Next, go to your command prompt and cd into client -> my-app. In my-app, type the command "npm start." This starts up the react front-end and a login page should pop up on your default web browser. Login to your Spotify account and start memorizing those lyrics!

## How Everything Works (According to my shoddy understanding)
App.js returns a spotify authorization code to Dashboard.jsx if it could find a code in the URL. Otherwise, App will redirect you to the Login page. Login.js has a react Container that contains a button which redirects to an authorization url. This authurl has a clientid which you can replace with your own client id that you can get from the Spotify developer dashboard and it contains the scopes that we want access to such as streaming and user playback. Once you get to dashboard (a react functional component) with your auth code, we try to get an access token with useAuth.js, a webhook that takes in the code. useAuth.js has a useState() for the accessToken, refreshToken, and expiresIn states. It will make an axios post request and server.js will process this request for the /login route. After receiving the code, this post route will initialize a new SpotifyWebApi with a clientID and client secret from spotify's node.js library api on github (https://github.com/thelinmichael/spotify-web-api-node). Using this spotify api, the api can create an access token, refresh token, and expiresIn time. After successful useAuth authorization, the access token will automatically refresh using expiresIn and refreshToken. Afterwards, dashboard.jsx will render the searchbar which uses TrackSearchResult.js to search for a track and communicate its title and artist through a GET route to call the lyricsfinder api. 

## Changes to be made
Probably shouldn't have the current login button say what it says now. Also, maybe I could add a nice little background to the login page?
