
import React, { Component } from 'react';
import App from './App/Components/App';
import { AppRegistry } from 'react-native';

export default class ShabbatClock extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('ShabbatClock', () => ShabbatClock);
