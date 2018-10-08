import React, { Component, Fragment } from 'react'
import axios from 'axios';
import Track from './Track';
import { Link } from 'react-router-dom';
import Spinner from '../Layout/Spinner';
class Artist extends Component {
  state = {
    track_list: [],
    loading: true
  }
  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?f_artist_id=${this.props.match.params.artist_id}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then((res) => {
        console.log(res.data)
        this.setState({ track_list: res.data.message.body.track_list, loading: false })
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { track_list, loading } = this.state;

    return (
      loading ? <Spinner /> : <Fragment>
        <Link to='/' className='btn btn-dark btn-sm mb-4'>Back to Homepage</Link>
        <h3 className='text-center mb-4'>{`Result for ${track_list[0].track.artist_name}`}</h3>
        <div className='row'>
          {track_list.map(track => (
            <Track track={track.track} key={track.track.track_id} />
          ))}

        </div></Fragment>
    )
  }
}


export default Artist;
