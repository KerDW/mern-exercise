import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SongContainer from './SongContainer';

class ShowSongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      allFilteredSongs: [],
      filter: "",
      url: ""
    };
  }

  componentDidMount() {
    this.onReloadData()
  };

  onReloadData() {
    axios
      .get('http://localhost:8082/api/songs')
      .then(res => {
        this.setState({
          songs: res.data,
          allFilteredSongs: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowSongList');
      })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onFilter(e) {
    e.preventDefault()

    var filteredSongs = [];
    let filter = e.target.value

    console.log(filter)

    for (let song of this.state.songs) {
      if(song.name.toLowerCase().includes(filter.toLowerCase())){
        filteredSongs.push(song)
      }
    }

    this.setState({ filter })
    this.setState({ allFilteredSongs: filteredSongs });
  }

  onSubmit = e => {
    e.preventDefault();

    if(this.state.url.includes("youtube.com/watch?v=")){

      const data = {
          url: this.state.url
      };

      axios
        .post('http://localhost:8082/api/songs', data)
        .then(res => {
          this.setState({
              url: ""
          })
          this.onReloadData()
        })
        .catch(err => {
          console.log("Error in AddSong!");
        })

    } else {
      alert('Insert a valid youtube URL')
    }

  };

  onDeleteAllClick() {
    axios
      .delete('http://localhost:8082/api/songs')
      .then(res => {
        this.onReloadData()
      })
      .catch(err => {
        console.log("Error form ShowSongList_deleteAllClick");
      })
  }

  render() {
    const songs = this.state.allFilteredSongs;
    const {filter} = this.state;
    let songList;

    if(songs) {
      songList = songs.map((song, k) =>
        <SongContainer song={song} key={k} />
      );
    }

    return (
      <div className="ShowSongList">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <br />
              <h2 className="display-4 text-center">Songs</h2>
            </div>

            <div className="addSongButton col-md-2">
              <Link to="/songs/add-song" className="btn btn-outline-warning btn-block float-right">
                + Add song
              </Link>
              <br/><br/>
              <button type="button" className="btn btn-outline-danger btn-block" onClick={this.onDeleteAllClick.bind(this)}>Remove all songs</button>
            </div>

            <div className="addSongField col-md-8">
              <form className="form-inline" noValidate onSubmit={this.onSubmit.bind(this)}>
                <input
                    type='text'
                    name='url'
                    placeholder="URL"
                    size="60"
                    className='form-control input-url'
                    value={this.state.url}
                    onChange={this.onChange}
                />
                <input
                    type="submit"
                    className="btn btn-outline-warning saveSongButton"
                    value="Save song"
                />
                </form>
            </div>
            <div className="songFilter col-md-4">
            <input
                    type='text'
                    name='filter'
                    placeholder="Filter"
                    size="40"
                    className='form-control'
                    value={filter}
                    onChange={this.onFilter.bind(this)}
                />
            </div>

          </div>

          <div className="songList">
                {songList}
          </div>
        </div>
      </div>
    );
  }
}

export default ShowSongList;