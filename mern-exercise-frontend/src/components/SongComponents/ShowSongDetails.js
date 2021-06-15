import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';

class ShowSongDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: {}
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/songs/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          song: res.data
        })
      })
      .catch(err => {
        console.log("Error from ShowSongDetails");
      })
  };

  onDeleteClick (id) {
    axios
      .delete('http://localhost:8082/api/songs/' + id)
      .then(res => {
        this.props.history.push("/songs");
      })
      .catch(err => {
        console.log("Error form ShowSongDetails_deleteClick");
      })
  };


  render() {

    const song = this.state.song;
    let SongItem = <div>
      <table className="table table-hover table-dark">
        <tbody>
          <tr>
            <td>Mood</td>
            <td>{ song.mood }</td>
          </tr>
          <tr>
            <td>Genre</td>
            <td>{ song.genre }</td>
          </tr>
          <tr>
            <td>Description</td>
            <td>{ song.description }</td>
          </tr>
        </tbody>
      </table>
    </div>

    return (
      <div className="ShowSongDetails">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <br /> <br />
              <Link to="/songs" className="btn btn-outline-warning float-left">
                  Song list
              </Link>
            </div>
            <br />
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Song info</h1>
              <hr /> <br />
            </div>
          </div>
          <div>
            { SongItem }
          </div>

          <div className="row">
            <div className="col-md-6">
              <button type="button" className="btn btn-outline-danger btn-lg btn-block" onClick={this.onDeleteClick.bind(this, song._id)}>Remove song</button><br />
            </div>

            <div className="col-md-6">
              <Link to={`/songs/edit-song/${song._id}`} className="btn btn-outline-info btn-lg btn-block">
                    Edit song
              </Link>
              <br />
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default ShowSongDetails;