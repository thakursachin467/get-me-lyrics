import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Main from './Components/Layout/Main';
import Lyrics from './Components/Tracks/Lyrics';
import Artist from './Components/Tracks/Artist'
import Album from './Components/Album/Album';
import Provider from './Context';
class App extends Component {
  render() {
    return (
      <Provider>
        <BrowserRouter>

          <Fragment >
            <Navbar />
            <div className='container'>
              <Switch>
                <Route exact path='/' component={Main} />
                <Route exact path='/lyrics/track/:track_id' component={Lyrics} />
                <Route exact path='/artist/:artist_id' component={Artist} />
                <Route exact path='/album/:album_id' component={Album} />
              </Switch>

            </div>

          </Fragment>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
