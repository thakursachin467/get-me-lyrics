import React, { Fragment } from 'react'
import Tracks from '../Tracks/Tracks'
import Search from '../Tracks/Search';
export default () => {
  return (
    <Fragment>
      <Search />
      <Tracks />
    </Fragment>
  )
}
