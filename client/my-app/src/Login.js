
//Purpose: When you click the login button, you have to agree to scopes and then the response is a code
//hence why we make the response type in authurl "code" because after agreeing you are brought back to the original
//login webpage but the url now has code=something in the url which we must turn it into the token


import React from "react";
import { Container } from "react-bootstrap";
//had to npm i bootstrap react-bootstrap in client to import bootstrap 
//okay but actually don't know if I did the initial create react command right because I created my-app within client. 
//Should I have created a react app called client?? Or am I doing this right? Or should I have chosen the same name as the folder which would be client then?
//because then should I have done npm -i bootstrap react-bootstrap in my-app or client?
//Don't know if this solves any problems



//notice how %20 is a space lol
//why does this url throw an error when split on two diff lines?
const Authurl = "https://accounts.spotify.com/authorize?client_id=12a0ce32425144509017166ad7cc08d3&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

//I think that you can have multiple classnames for a tag when you put spaces in between
//cool that you can directly input css with style attribute for a minheight button
export default function Login() {//notice how the function has the same name as the file when using rfc shortcut. IDK if this function must be named the same as the file
    return(
    <Container className="d-flex justify-content-center align-items-center" style ={{minHeight:"100vh"}}> 
        <a className="btn btn-success btn-lg" href={Authurl}> Login with Spotify or I'll steal your toes</a> 
    </Container>
    )
}

