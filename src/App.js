import React, { Component } from 'react';
import SNEX from 'snex';
import {Set} from 'immutable';

import Player from './Player';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      url: null,
      players: new Set(),
    };
  }

  componentDidMount() {
    SNEX.createSession()
    .then(session => {
      session.on('connection', conn => {
        const player = <Player conn={conn}/>;

        this.setState({
          players: this.state.players.add(player),
        });

        conn.on('close', () => {
          this.setState({
            players: this.state.players.delete(player),
          });
        });
      });

      return session.createURL('nes');
    })
    .then(({url}) => {
      this.setState({url});
    });
  }

  render() {
    return (
      <div className="App">
        <div>
          <img alt="SNEX Logo" className="App-logo" src="https://cdn.snex.io/images/snex-logo.svg" width="200"/>
        </div>

        <h2>React Example</h2>

        <div className='connect-url'>{this.state.url}</div>

        <ul className='players'>
          { this.state.players.map(player => {
            return <li>{player}</li>;
          }) }
        </ul>
      </div>
    );
  }
}

export default App;
