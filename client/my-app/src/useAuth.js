//custom hook for authentication and refreshing instead of putting it all in dashboard

import { useState, useEffect } from "react";
import axios from "axios"; //axios is used to call our api which is the alternative to built in fetch api I believe
import React from 'react'


export default function useAuth(code) { //will store access, refresh, and expiresin states
    //we don't care about anything being returned we just need it to be a custom hook that saves stuff
    //we want to get state for the three items needed
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    //to get info, we use useEffect
    //the input which is the second argument, is the code
    //at the login route, we post our data which is our code and then we get our response of data
    //axios HTTP methods require a URL and then post,put and patch require a second arg which is the data object to pass
    /*So basically, server.js's app is listening to port 3001 and has a function called app.post('/login') for when someboday
    goes to port 3001 within login at the end of the url. That's where the creation of Lin's spotify api and 3 credentials like client id
    and secret are used to get a code and then your tokens in json. This useEffect is interpreting that json to set the tokens
    and you can see that here is where axios is posting to 3001. server.js listens to 3001 and has a post login route -> 
    axios in useAuth posts to 3001 -> create spotify api in server.js and get tokens in json -> this useEffect sets everything*/
    useEffect(() => {
        axios.post('http://localhost:3001/login', {
            code
        }).then(res => {
            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            window.history.pushState({}, null, "/"); //essentially everything is gonna be empty and removes the code from the url for aesthetic. Redirets to original / login
        }).catch(() => {
            window.location = '/' //this is redirecting the person back to the login page in case tokens expire
        })
    }, [code])

    //useEffect will essentially say whenever expiresIn or refreshToken changes, then run useEffect.
    //Will refresh access token automatically essentially
    useEffect(() => {
        if(!refreshToken || !expiresIn) return 
        /*the if statement prevents the problem of this function running when login route is run
        because program could think that the refreshtoken is being changed so this should not be allowed to run unless
        there exists refreshToken and expiresIn to prevent being bounced back to the login page again*/
        const interval = setInterval(() => { //Anytime refresh or expiresIn changes, it is going to make sure it does the refresh of the timeout for us repeatedly
            axios.post('http://localhost:3001/refresh', {
            refreshToken,
             }).then(res => {
            //console.log(res.data);
             setAccessToken(res.data.accessToken);
            // setRefreshToken(res.data.refreshToken);
             setExpiresIn(res.data.expiresIn);
            //window.history.pushState({}, null, "/"); 
             }).catch(() => {
            window.location = '/' 
             })
        }, (expiresIn - 60) * 1000) //execute the timeout function 60 sec before expiration (converted to milliseconds)
        return () => clearInterval(interval) // if there's an error, we have to clear out the interval
    }, [refreshToken,expiresIn])

    return accessToken;
}
