/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
// import Time from 'react-time';

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

    this.state = { date: new Date() };

    // Toggle the state every second
    setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);
  }

  render() {
    return (
      <FormattedClock date={this.state.date} />
    );
  }
}

class FormattedClock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = this.props.date;

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let time = (hours<10 ? '0'+hours : hours)+":"+(minutes<10 ? '0'+minutes : minutes)+":"+(seconds<10 ? '0'+seconds : seconds);
    return (
      <Text>
        {getDayName(date)+"\n"+time}
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
