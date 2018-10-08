import React, { Component, Fragment } from 'react'
import { Consumer } from '../../Context';
import Spinner from '../Layout/Spinner';
import Track from './Track';
class Tracks extends Component {
  render() {
    return (
      <Consumer >
        {value => {
          const { track_list, heading, loading } = value;
          if (loading) {
            return <Spinner />
          }
          return (
            <Fragment>
              <h3 className='text-center mb-4'>{heading}</h3>
              <div className='row'>
                {track_list.map(track => (
                  <Track track={track.track} key={track.track.track_id} />
                ))}

              </div></Fragment>

          );
        }}
      </Consumer>
    )
  }
}


export default Tracks;
