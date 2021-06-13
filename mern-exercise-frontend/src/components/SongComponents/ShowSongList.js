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
          songs: res.data
        })
      })
      .catch(err =>{
        console.log('Error from ShowSongList');
      })
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
      alert('insert a valid youtube URL')
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

            <div className="addSongField col-md-12">
              <form className="form-inline" noValidate onSubmit={this.onSubmit.bind(this)}>
                <input
                    type='text'
                    name='url'
                    placeholder="URL"
                    size="100"
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