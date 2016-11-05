/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Time from 'react-time';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

function getDayName(dateString) {
  return ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'][new Date(dateString).getDay()];
}

class Clock extends Component {
  constructor(props) {
    super(props);

    let now = new Date();

    this.state = { date: date, time: time };

    let date = getDayName(now)+" "+now.getUTCDate();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let time = (hours<10 ? '0'+hours : hours)+":"+(minutes<10 ? '0'+minutes : minutes);


    // Toggle the state every second
    setInterval(() => {

      let now = new Date();
      let date = getDayName(now)+" "+now.getUTCDate();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let time = (hours<10 ? '0'+hours : hours)+":"+(minutes<10 ? '0'+minutes : minutes);

      this.setState({ date: date, time: time });
    }, 1000);


  }

  render() {
    return (
      <Text>
        {this.state.date}
        {"\n"}
        {this.state.time}
      </Text>
    );
  }
}

export default class ShabbatClock extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          <Clock />
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ShabbatClock', () => ShabbatClock);
