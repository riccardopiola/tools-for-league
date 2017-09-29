// @flow
import React, { Component } from 'react';

export default class App extends Component {
  props: {
    showHome: (boolean) => void
  }
  render() {
    return (
      <div>
        <button onClick={() => this.props.showHome(true)}>BACK</button>
      </div>
    );
  }
}
