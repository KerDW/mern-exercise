import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SongContainer from './SongContainer';

class ShowSongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: []
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/songs')
      .then(res => {
        this.setState({
          songs: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowSongList');
      })
  };


  render() {
    const songs = this.state.songs;
    let songList;

    if(!songs) {
      songList = "There are no songs!";
    } else {
      songList = songs.map((song, k) =>
        <SongContainer song={song} key={k} />
      );
    }

    return (
      <div className="ShowSongList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Songs</h2>
            </div>

            <hr />

            <div className="col-md-11">
              <Link to="/songs/add-song" className="btn btn-outline-warning float-right">
                + Add song
              </Link>
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {songList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowSongList;