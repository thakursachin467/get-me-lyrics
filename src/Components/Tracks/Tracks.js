import React, { Component, Fragment } from 'react'
import { Consumer } from '../../Context';
import Spinner from '../Layout/Spinner';
import Track from './Track';
class Tracks extends Component {
  onPreviousClick(value, e) {
    e.preventDefault()
    let newPage = value.defaultPage - 1;
    if (newPage < 1) {
      newPage = 1;
    }
    value.dispatch({ type: 'CHANGE_PAGE', payload: newPage })

  }
  onForwardClick(value, e) {
    e.preventDefault()
    let newPage = value.defaultPage + 1;
    value.dispatch({ type: 'CHANGE_PAGE', payload: newPage })

  }
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

              </div>
              <div className='Page navigation mb-5'>
                <ul className="pagination d-flex justify-content-center">
                  <button className="page-item mr-2 btn btn-dark" onClick={this.onPreviousClick.bind(this, value)}>Previous</button>
                  <button className="page-item ml-2 btn btn-dark" onClick={this.onForwardClick.bind(this, value)}>Next</button>
                </ul>
              </div>
            </Fragment>

          );
        }}
      </Consumer>
    )
  }
}


export default Tracks;
