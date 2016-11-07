import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default class FormattedClock extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text style={styles.date}>
          {this.props.datetime.format("dddd, MMM Do")}
        </Text>
        <Text style={styles.time}>
          {this.props.datetime.format("H:mm")}
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
