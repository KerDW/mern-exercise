import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import bookImage from '../books.png'
import songImage from '../song.jpg'

class ShowBookList extends Component {

  render() {

    return (
      <div className="ShowComponentList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Components</h2>
            </div>

          </div>

          <br />
          <br />

          <div className="components">
                <div >

                    <Link to="/books/">
                      <img src={bookImage} alt="" className="bookImage" />
                    </Link>

                    <Link to="/songs/">
                      <img src={songImage} alt="" className="songImage" />
                    </Link>

                </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowBookList;