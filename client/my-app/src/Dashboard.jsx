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

/*New features: sort playlist by release date
*/

export default function Dashboard({code}) {
    const accessToken = useAuth(code); 
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [playingTrack, setPlayingTrack] = useState();
    const [queue, setQueue] = useState();
    const [lyrics, setLyrics] = useState("");
    const [artist, setArtist] = useState();
    const [instrument, setInstrument] = useState();
    const [speechiness, setSpeechiness] = useState();
    // const [bpm, setBPM] = useState();
    // const [albumName, setAlbumName] = useState();
   

    function chooseTrack(track) {
        setPlayingTrack(track);
        setSearch('');
        setLyrics("");
    }

    function chooseQueue(track){
        setQueue(track)
    }
    
    useEffect(() => {
        if(!queue) return;
        spotAPI.addToQueue(queue.uri)
        
        // .then(res => {
        //     return {
        //         uri:queue.uri
        //     }
        // })
        //so I guess I don't need to return anything?
        //but it also doesn't save the queue?
    

    }, [queue])

    //function that can set the state of a queued song?
    //useEffect that triggers when queue changes
    //call spotAPI and add to queue?

    //when playingTrack changes, how can I show traits?

    useEffect(() => {
        if(!playingTrack) return;
        
        setArtist(playingTrack.artist)
        var strippedID = playingTrack.uri.substr(14);
       console.log(strippedID);
        spotAPI.getAudioFeaturesForTrack(strippedID).then(function(data){
            setInstrument(data.body.instrumentalness);
            setSpeechiness(data.body.speechiness);
        });
        // const audioFeatures = (spotAPI.getAudioFeaturesForTrack(strippedID)).body;
        // setInstrument(audioFeatures.tempo);
      // setInstrument(playingTrack.popularity);
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
                  
                  popularity: track.popularity,
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
                    <TrackSearchResult track ={track} key = {track.uri} chooseTrack = {chooseTrack} chooseQueue = {chooseQueue}/>
                ))}
                {searchResults.length === 0 && (
                    <div className = "text-center" style = {{whiteSpace: "pre"}}>
                    {lyrics}
                    <h2>Artist: {artist}</h2>
                     
                    <h2>Instrumentalness (0-1): {instrument}</h2>
                    
                    <h2>Speechiness (0-1): {speechiness}</h2>
                    
                    </div>
                    
                )}
                {searchResults.length === 0 && (
                    <div className = "text-center" style = {{whiteSpace: "pre"}}>
                    
                    </div>
    
                    
                )}
                
            </div>
            <div><Player accessToken={accessToken} trackUri = {playingTrack?.uri} /></div>
        </Container>
    )
}