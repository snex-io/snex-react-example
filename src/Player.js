import React, { Component } from 'react';

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    props.conn.on('data', message => {
      this.setState({
        messages: this.state.messages.concat(message),
      });
    });
  }

  render() {
    return <div className='player'>
      <h2>Waiting for input</h2>
      <ul>
        { this.state.messages.map(message => {
          return <li>{JSON.stringify(message)}</li>;
        }) }
      </ul>
    </div>
  }
}

export default Player;
