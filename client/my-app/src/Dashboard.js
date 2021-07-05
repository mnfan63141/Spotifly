import React from 'react';
import useAuth from "./useAuth";
import { Container, Form } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackSearchResult from "./TrackSearchResult";
import Player from "./Player";
import axios from "axios";

const spotAPI = new SpotifyWebApi({
    clientId: "12a0ce32425144509017166ad7cc08d3"
})

export default function Dashboard({code}) {
    const accessToken = useAuth(code); //!!so basically I did npm run devStart in command prompt in server and then npm start in my-app from vs code's terminal and then ran.
    //Is that what I should've done? Do I need both things started? What's the purpose of either one?
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [lyrics, setLyrics] = useState("")

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch('');
        setLyrics("");
    }

    useEffect(() => {
        if(!playingTrack) return;
        
        axios.get("http://localhost:3001/lyrics", {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        }).then(res => {
            setLyrics(res.data.lyrics)
        })

    }, [playingTrack])
    
    useEffect(() => {
        if(!accessToken) return;
        spotAPI.setAccessToken(accessToken);
    }, [accessToken]);

    useEffect(() => {
        if(!search) return setSearchResults([]);
        if(!accessToken) return;

        let cancel = false;

        spotAPI.searchTracks(search).then(res => {

            if (cancel) return
            setSearchResults(
            res.body.tracks.items.map(track => {
              const smallAlbumImg = track.album.images.reduce(
                  (smallest, image) => {
                    if (image.height < smallest.height) return image
                    return smallest
              }, track.album.images[0])
              
              return {
                  artist: track.artists[0].name,
                  title: track.name,
                  uri: track.uri,
                //  id: track.id,
                  albumUrl: smallAlbumImg.url
              }
            })
            )
        })

        return () => (cancel = true) //make the request but if new request is made then we set the cancel to true to cancel the request
    }, [search, accessToken]);
    
    return (
        <Container className="d-flex flex-column py-2" style={{height: "100vh"}}>
            
            <Form.Control type="search" placeholder = "Search Songs/Artists" value={search} onChange ={e => setSearch(e.target.value)}/>
            
            <div className = "flex-grow-1 myp2" style = {{overflowY:"auto"}}>
                {searchResults.map(track => (
                    <TrackSearchResult track ={track} key = {track.uri} chooseTrack = {chooseTrack} />
                ))}
                {searchResults.length === 0 && (
                    <div className = "text-center" style = {{whiteSpace: "pre"}}>
                    {lyrics}
                    </div>
                )}
            </div>
            <div><Player accessToken={accessToken} trackUri = {playingTrack?.uri} /></div>
        </Container>
    )
}
