import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';
import Moment from 'react-moment';
class Lyrics extends Component {
  state = {
    track: {},
    lyrics: {},
    loading: true
  };
  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${this.props.match.params.track_id}&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then((res) => {
        this.setState({ lyrics: res.data.message.body.lyrics });
        return axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.get?track_id=${this.props.match.params.track_id}&apikey=${process.env.REACT_APP_MM_KEY}`)
          .then((res) => {
            console.log(res.data.message.body.track)
            this.setState({ track: res.data.message.body.track, loading: false })
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }

  render() {
    const { track, lyrics, loading } = this.state;
    let explicit, genre;

    let data;
    if (loading) {
      data = <Spinner />
    } else {
      if (track.explicit) {
        explicit = 'Yes'
      } else {
        explicit = 'No'
      }

      if (track.primary_genres.music_genre_list.length > 0) {
        genre = track.primary_genres.music_genre_list[0].music_genre.music_genre_name;
      } else {
        genre = 'No Info Available'
      }
      data =
        <Fragment>
          <Link to='/' className='btn btn-dark btn-sm mb-4'>Back to Homepage</Link>
          <div className='card'>
            <h5 className='card-header'>
              <p>{track.track_name}</p>  <strong>by</strong> <Link className='text-secondary text-muted' to={`/artist/${track.artist_id}`}>{track.artist_name}</Link>
            </h5>
            <div className='card-body'>
              <p className='card-text'>{lyrics.lyrics_body}</p>
            </div>
          </div>
          <ul className='list-group mt-3'>
            <li className='list-group-item'>
              <strong>Album Id: </strong> {track.album_id}
            </li>
            <li className='list-group-item'><strong>Album Name: </strong> {track.album_name}</li>
            <li className='list-group-item'><strong>Artist Name: </strong> {track.artist_name}</li>
            <li className='list-group-item'><strong>Genre: </strong> {genre}</li>
            <li className='list-group-item'><strong>Release Date: </strong>
              <Moment format="DD/MM/YYYY" >
                {track.first_release_date}
              </Moment>
              &nbsp;
              (<Moment fromNow>
                {track.first_release_date}
              </Moment>)
            </li>
            <li className='list-group-item'><strong>Song Rating: </strong> {track.track_rating}</li>
            <li className='list-group-item'><strong>Explicit Words: </strong>  {explicit}</li>

          </ul>
        </Fragment>
    }
    return (
      <div>
        {data}
      </div>
    )
  }
}



export default Lyrics;
