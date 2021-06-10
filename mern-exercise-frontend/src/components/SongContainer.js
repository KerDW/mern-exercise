import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const SongContainer = (props) => {
    const song = props.song;

    return(
        <div className="song-container">
            <img src={`${song.thumbnail_url}`} alt=""/>
            <div className="desc">
                <h2>
                    <Link to={`/show-song/${song._id}`}>
                        { song.name }
                    </Link>
                </h2>
                <h3>{song.mood}</h3>
                <p>{song.description}</p>
            </div>
        </div>
    )
};

export default SongContainer;