import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';


class AddSong extends Component {
  constructor() {
    super();
    this.state = {
        url: "",
        mood: "",
        genre: "",
        description: ""
    };
  }

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
      .post('http://localhost:8082/api/songs', data)
      .then(res => {
        this.setState({
            url: "",
            mood: "",
            genre: "",
            description: ""
        })
        this.props.history.push('/songs');
      })
      .catch(err => {
        console.log("Error in AddSong!");
      })
  };

  render() {
    return (
      <div className="AddSong">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <br />
              <Link to="/songs" className="btn btn-outline-warning float-left">
                  Show song list
              </Link>
            </div>
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add a song</h1>
              <hr />

              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        name='url'
                        placeholder="URL *"
                        className='form-control input-url'
                        value={this.state.url}
                        onChange={this.onChange}
                    />
                </div>
                <br />

                <div className='form-group'>
                  <input
                    type='text'
                    name='mood'
                    placeholder="Mood"
                    className='form-control'
                    value={this.state.mood}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    name='genre'
                    placeholder="Genre"
                    className='form-control'
                    value={this.state.genre}
                    onChange={this.onChange}
                  />
                </div>

                <div className='form-group'>
                  <input
                    type='text'
                    name='description'
                    placeholder="Description"
                    className='form-control'
                    value={this.state.description}
                    onChange={this.onChange}
                  />
                </div>

                <input
                    type="submit"
                    className="btn btn-outline-warning btn-block mt-4"
                    value="Save song"
                />
              </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSong;