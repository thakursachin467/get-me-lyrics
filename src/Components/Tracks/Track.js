import React from 'react'
import { Link } from 'react-router-dom'
const Track = (props) => {
  const { track } = props;
  return (
    <div className='col-md-6'>
      <div className='card mb-4 shadow-sm'>
        <div className='card-body shadow-lg rounded'>
          <Link to={`/artist/${track.artist_id}`}><h5>{track.artist_name}</h5></Link>
          <br></br>
          <p className='card-text'><strong><i className='fas fa-play'></i>Track:</strong> {track.track_name}</p>
          <p className='card-text'><strong><i className='fas fa-compact-disc'></i>Album:</strong><Link to={`/album/${track.album_id}`}> {track.album_name}</Link> </p>
          <Link to={`/lyrics/track/${track.track_id}`} className='btn btn-dark btn-block'>
            <i className='fas fa-chevron-right'></i> View Lyrics

            </Link>
        </div>

      </div>
    </div>
  )
}

export default Track;
