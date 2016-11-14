import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

import I18n from 'react-native-i18n'

var moment = require('moment');

import 'moment/locale/fr'

moment.locale(I18n.currentLocale());

export default class Clock extends Component {
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
          {this.state.now.format("ddd").toUpperCase()+' '+this.state.now.date()}
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
    marginTop: 10,
  },
  time: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 78,
  },
});
