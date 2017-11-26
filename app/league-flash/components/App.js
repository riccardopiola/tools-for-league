// @flow
import React, { Component } from 'react';

import HomePage from '../containers/HomePage';
import GamePage from '../containers/GamePage';
import LoadingPage from '../containers/LoadingPage';
import ErrorPage from './Error';

type Props = {
  route: string,
  message: string,
  changeRoute: (ruote: string, message?: string) => void
};

export default class App extends Component<Props> {
  render() {
    switch (this.props.route) {
      case 'home':
        return <HomePage />;
      case 'game':
        return <GamePage />;
      case 'loading':
        return <LoadingPage />;
      default:
        return (
          <ErrorPage
            message={this.props.message}
            changeRoute={this.props.changeRoute}
          />
        );
    }
  }
}
