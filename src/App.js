import React, { Component, Fragment } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Components/Layout/Navbar';
import Main from './Components/Layout/Main';
import Lyrics from './Components/Tracks/Lyrics';
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

              </Switch>

            </div>

          </Fragment>
        </BrowserRouter>
      </Provider>

    );
  }
}

export default App;
