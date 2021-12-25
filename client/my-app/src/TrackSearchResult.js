import React from 'react'

/*TrackSearchResult is taking in a track with albumUrl and title and artist and id
Also takes in chooseTrack which is a function from dashboard that sets the state of the playing song
So then on the click of the whole div which is the row that belongs to a song, you can go to handlePlay
which goes to chooseTrack to set the state of the playing song
I could add an onClick = {handleQue()} or I could just pass some function that sets a state in dashboard to put to the top of the queue
*/
export default function TrackSearchResult({track, chooseTrack, chooseQueue}) {
function handlePlay(){
    chooseTrack(track)
}

function handleQueue(){
    chooseQueue(track)
}

    return <div className = "d-flex m-2 align-items-center" style = {{cursor: "pointer"}} >
            <img src = {track.albumUrl} style = {{height: "64px", width: "64px"}} />
            <div className="ml-3">
                <div onClick = {handlePlay}>{track.title}</div>
                <div onClick = {handleQueue}>Add to top</div>
                <div className = "text-muted">{track.artist}</div>
            </div>
            
        </div>
    
}
