import React, { Component } from 'react';
import './App.css';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    if (token) {
      spotifyApi.setAccessToken(token);
    }
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { id: "", name: 'Not Checked', albumArt: '', song:"" }
    }
  }
  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    spotifyApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: { 
              id: response.item.id,
              name: response.item.name, 
              albumArt: response.item.album.images[0].url
            }
        });
      })
  }

  getSongPlaying(){
    spotifyApi.getAudioFeaturesForTrack(this.state.nowPlaying.id)
    .then((response) => {
      this.setState({
        nowPlaying: {
          song: response.duration_ms
        }
      })
      console.log(response);
      console.log(this.state.nowPlaying.song)
    })
  }




  render() {
    return (
      <div className="App">
        <a href='http://localhost:8888' > Login to Spotify </a>
        <div>
          Now Playing: { this.state.nowPlaying.id }
        </div>
        <div>
          Now Playing: { this.state.nowPlaying.name }
        </div>
        <div>
          <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
        </div>
        <div>
          Miliseconds of the song id: { this.state.nowPlaying.song }
        </div>


        <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1EacuqDdVixRjX" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        <iframe src="https://open.spotify.com/embed/album/4MHHajvRTUHItDsvfdIC8B" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
        <iframe src="https://open.spotify.com/embed/playlist/37i9dQZEVXbMDoHDwVN2tF" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

        { this.state.loggedIn &&
          <button onClick={() => this.getNowPlaying()}>
            Check Now Playing
          </button>
        }

        { this.state.loggedIn &&
          <button onClick={() => this.getSongPlaying()}>
            New Song
          </button>
        }


      </div>
    );
  }
}

export default App;
