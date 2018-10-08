import React, { Component } from 'react';
import axios from 'axios';
import Spinner from '../Layout/Spinner';
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
    let data;
    if (loading) {
      data = <Spinner />
    } else {
      data = <p>{lyrics.lyrics_body}</p>
    }
    return (
      <div>
        {data}
      </div>
    )
  }
}



export default Lyrics;
