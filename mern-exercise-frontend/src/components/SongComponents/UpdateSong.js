import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

class UpdateSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
        url: "",
        mood: "",
        genre: "",
        description: ""
    };
  }

  componentDidMount() {
    axios
      .get('http://localhost:8082/api/songs/'+this.props.match.params.id)
      .then(res => {
        this.setState({
            url: res.data.url,
            mood: res.data.mood,
            genre: res.data.genre,
            description: res.data.description
        })
      })
      .catch(err => {
        console.log("Error from UpdateSong");
      })
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
        url: this.state.url,
        mood: this.state.mood,
        genre: this.state.genre,
        description: this.state.description
    };

    axios
      .put('http://localhost:8082/api/songs/'+this.props.match.params.id, data)
      .then(res => {
        this.props.history.push('/songs/show-song/'+this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error in UpdateSong!");
      })
  };


  render() {
    return (
      <div className="UpdateSong">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/songs/" className="btn btn-outline-warning float-left">
                  Song list
              </Link>
              <Link to={`/songs/show-song/${this.props.match.params.id}`} className="btn btn-outline-warning float-right">
                  Song info
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit song</h1>
              <p className="lead text-center">
                  Update song info
              </p>
            </div>
          </div>

          <div className="col-md-8 m-auto">
          <form noValidate onSubmit={this.onSubmit}>

            <div className='form-group'>
            <label htmlFor="isbn">Mood</label>
              <input
                type='text'
                placeholder='Mood'
                name='mood'
                className='form-control'
                value={this.state.mood}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="author">Genre</label>
              <input
                type='text'
                placeholder='Genre'
                name='genre'
                className='form-control'
                value={this.state.genre}
                onChange={this.onChange}
              />
            </div>

            <div className='form-group'>
            <label htmlFor="description">Description</label>
              <input
                type='text'
                placeholder='Description'
                name='description'
                className='form-control'
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>

            <button type="submit" className="btn btn-outline-info btn-lg btn-block">Update Song</button>
            </form>
          </div>

        </div>
      </div>
    );
  }
}

export default UpdateSong;