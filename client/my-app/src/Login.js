
//Purpose: When you click the login button, you have to agree to scopes and then the response is a code
//hence why we make the response type in authurl "code" because after agreeing you are brought back to the original
//login webpage but the url now has code=something in the url which we must use to request the access token


import React from "react";
import { Container } from "react-bootstrap";
//had to npm i bootstrap react-bootstrap in client to import bootstrap 



//notice how %20 is a space
//why does this url throw an error when split on two diff lines?
const Authurl = "https://accounts.spotify.com/authorize?client_id=12a0ce32425144509017166ad7cc08d3&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

//Notice that you can have multiple classnames for a tag when you put spaces in between
//it's cool that you can directly input css with style attribute for a minheight button
export default function Login() {//notice how the function has the same name as the file when using rfc shortcut. IDK if this function must be named the same as the file
    return(
    <Container className="d-flex justify-content-center align-items-center" style ={{minHeight:"100vh"}}> 
        <a className="btn btn-success btn-lg" href={Authurl}> Login with Spotify</a> 
    </Container>
    )
}

