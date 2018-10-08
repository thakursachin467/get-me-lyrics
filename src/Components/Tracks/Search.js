import React, { Component } from 'react'
import { Consumer } from '../../Context';
import axios from 'axios';
class Search extends Component {
  state = {
    track_title: ''
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  onSubmit(dispatch, e) {
    e.preventDefault();
    dispatch({ type: 'LOADING' })
    console.log(this.state.track_title);
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q=${this.state.track_title}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then((res) => {
        dispatch({ type: 'SEARCH_TRACK', payload: res.data.message.body.track_list })
        this.setState({ track_title: '' })
      })
      .catch((err) => console.log(err));


  }
  render() {
    return (
      < Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className='card mb-4 card-body p-4'>
              <h1 className='display-4 text-center'><i className='fas fa-music'></i> Search for a Song</h1>
              <p className='lead text-center'>Serch for a song and get lyrics</p>
              <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                <div className='form-group'>
                  <input className='form-control form-control-lg' type='text' placeholder='Search for a song....' name='track_title' value={this.state.track_title} onChange={this.onChange}></input>
                  <button type='submit' className='btn btn-dark mt-3 btn-block'>Search</button>
                </div>
              </form>
            </div>
          )
        }
        }
      </Consumer>

    )
  }
}

export default Search;
