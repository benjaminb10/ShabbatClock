import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

var moment = require('moment');

function getDayName(dateString) {
  return ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'][new Date(dateString).getDay()];
}

export default class FormattedClock extends Component {

  constructor(props) {
    super(props);

    this.state = {
      now: moment(),
    };

    setInterval(() => {
      this.setState({
        now: moment(),
      });
    }, 1000);
  }

  render() {
    return (
      <View>
        <Text style={styles.date}>
          {this.state.now.format("dddd, MMM Do")}
        </Text>
        <Text style={styles.time}>
          {this.state.now.format("H:mm")}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  date: {
    color: '#FF001F',
    textAlign: 'center',
    fontSize: 28,
    marginTop: 50,
  },
  time: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 78,
  },
});
