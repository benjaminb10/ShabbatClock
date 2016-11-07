/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Clock from './App/Components/Clock';
import Schedules from './App/Components/Schedules';
import Geolocation from './App/Components/Geolocation';

export default class ShabbatClock extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Clock />
        </View>
        <View style={styles.schedulesContainer}>
          <Schedules />
        </View>
        <View style={styles.informationsContainer}>
          <Geolocation />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  timeContainer: {
    flex: 0.3,
  },
  date: {
    color: '#FF001F',
    textAlign: 'center',
    fontSize: 18,
  },
  schedulesContainer: {
    flex: 0.4,
  },
  informationsContainer: {
    flex: 0.15,
    justifyContent: 'center',
  },
  informations: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 18,
  },
});

AppRegistry.registerComponent('ShabbatClock', () => ShabbatClock);
