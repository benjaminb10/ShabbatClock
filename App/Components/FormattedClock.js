import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

function getDayName(dateString) {
  return ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'][new Date(dateString).getDay()];
}

export default class FormattedClock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let date = this.props.date;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time = (hours<10 ? '0'+hours : hours)+":"+(minutes<10 ? '0'+minutes : minutes);

    return (
      <View>
        <Text style={styles.date}>
          {getDayName(date)+" "+date.getDate()}
        </Text>
        <Text style={styles.time}>
          {time}
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
