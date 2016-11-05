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

export default class ShabbatClock extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Clock />
        </View>
        <View style={styles.schedulesContainer}>
        </View>
        <View style={styles.informationsContainer}>
          <Text style={styles.informations}>
            Horaires de Paris, France
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    flex: 0.6,
  },
  informationsContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  informations: {
    color: '#4A4A4A',
    textAlign: 'center',
    fontSize: 18,
  },
});

AppRegistry.registerComponent('ShabbatClock', () => ShabbatClock);
