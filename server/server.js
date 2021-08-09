//had to do npm init -y to actually initalize my own package json
//had to run npm i express spotify-web-api-node to install express framework and michael lin's spotify api nodejs packages


//what is express doing and why do we need require?
    //require is like import or #include that comes with node, not js
    //express is for setting up servers within node
const express = require('express');
const cors = require('cors');
const SpotifyWebApi = require('spotify-web-api-node'); //!! big mistake I made was setting spotAPI = require(etc.) when it should've been Lin's SpotifyWebApi
const lyricsFinder = require("lyrics-finder");
// const bodyParser = require('body-parser'); We actually didn't need bodyparser since it's deprecated and express can parse json with app.use(express.json());

const app = express(); //creates express application
app.use(cors()); //fixes cors errors
app.use(express.json());
app.use(express.urlencoded());


app.post('/login', (req,res) => { //we want to post a simple login application
    const code = req.body.code; //I thought the code is coming in a response? Or is this related to how the login url generates a code and that's what this is referring to?
        //I think my previous comment is correct cuz the library says "code that's returned as a query param to the redirect URI"
        //req.body.code requires a body parser package to be installed in server with npm i body-parser
        //don't actually need body parser for the reason specified in the comment next to bodyParser declaration
    const spotAPI = new SpotifyWebApi({ //the following three credentials are what are specifically needed my lin's library api authorization code grant flow 
        redirectUri: 'http://localhost:3000',
        clientId: '12a0ce32425144509017166ad7cc08d3',
        clientSecret: 'b51da3bf868f439480856e9ef0c99a7a'
    })

    spotAPI
    .authorizationCodeGrant(code) //authorize our code to receive tokens
    .then(data => {
        res.json({ //this is all the stuff we want to return from our api with our code. Also follows formatting (e.g. access_token) of the library api
            accessToken:data.body.access_token,
            refreshToken:data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(() => {
        res.sendStatus(400); //error code 400 if the promise isn't accepted
    })
})

app.post('/refresh', (req, res) => { // just use lin's api refreshAccessToken() function which just needs a refresh token
    const refreshToken = req.body.refreshToken;
    const spotAPI = new SpotifyWebApi({ //notice how we now need to pass an additional parameter of refreshToken and we can refresh our already retrieved access token
        redirectUri: 'http://localhost:3000',
        clientId: '12a0ce32425144509017166ad7cc08d3',
        clientSecret: 'b51da3bf868f439480856e9ef0c99a7a',
        refreshToken,
    })

    spotAPI.refreshAccessToken().then(
        data => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
    })
    .catch((err) => {
        console.log(err); //appears on command prompt! Whereas consolelogging errors in useAuth appears in browser console!
        res.sendStatus(400)
    })
})

app.get('/lyrics', async (req, res) => {
    const lyrics = (await lyricsFinder(req.query.artist, req.query.track)) || "No lyrics found"
    res.json({lyrics});
})

app.get('/traits', (req, res) => {
    //we'd need a track's unique id for identificcation through the api, how can we get it?
    const spotAPI = new SpotifyWebApi({ 
        redirectUri: 'http://localhost:3000',
        clientId: '12a0ce32425144509017166ad7cc08d3',
        clientSecret: 'b51da3bf868f439480856e9ef0c99a7a',
    })
    spotAPI
    
    .then(
        data => {
            res.json({
                
            })
    })
    .catch((err) => {
        console.log(err); //appears on command prompt! Whereas consolelogging errors in useAuth appears in browser console!
        res.sendStatus(400)
    })
})

app.listen(3001);