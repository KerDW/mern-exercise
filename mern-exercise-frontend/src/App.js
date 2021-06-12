import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import RootComponent from './components/RootComponent';
import ShowSongList from './components/SongComponents/ShowSongList';
import AddSong from './components/SongComponents/AddSong';
import ShowSongDetails from './components/SongComponents/ShowSongDetails';
import CreateBook from './components/BookComponents/CreateBook';
import ShowBookList from './components/BookComponents/ShowBookList';
import ShowBookDetails from './components/BookComponents/ShowBookDetails';
import UpdateBookInfo from './components/BookComponents/UpdateBookInfo';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path='/' component={RootComponent} />
          <Route exact path='/songs' component={ShowSongList} />
          <Route path='/songs/add-song' component={AddSong} />
          <Route path='/songs/show-song/:id' component={ShowSongDetails} />
          <Route exact path="/books" component={ShowBookList} />
          <Route path='/books/create-book' component={CreateBook} />
          <Route path='/books/edit-book/:id' component={UpdateBookInfo} />
          <Route path='/books/show-book/:id' component={ShowBookDetails} />
        </div>
      </Router>
    );
  }
}

export default App;