import React, { Component } from 'react'
import axios from 'axios';
const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACK':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search results',
        loading: false
      }
    case 'LOADING':
      return {
        ...state,
        loading: true
      }
    case 'CHANGE_PAGE':

      return {
        ...state,
        defaultPage: action.payload
      }

    default:
      return {
        ...state
      }

  }
}
export default class Provider extends Component {
  state = {
    track_list: [],
    heading: 'Top 10 Tracks this week',
    loading: true,
    dispatch: action => this.setState(state => reducer(state, action)),
    defaultPage: 1
  }





  componentDidMount() {
    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=${this.state.defaultPage}&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then((res) => {

        this.setState({ track_list: res.data.message.body.track_list, loading: false })
      })
      .catch((err) => console.log(err))

  }
  render() {

    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    )
  }
}


export const Consumer = Context.Consumer;
