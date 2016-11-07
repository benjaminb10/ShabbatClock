import React, { Component } from 'react';

import {
  Text,
  View,
  StyleSheet,
} from 'react-native';

var moment = require('moment');

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shabbatStartDate: moment(),
      shabbatEndDate: moment(),
      shabbatStartDateFromNow: 0, // in seconds
      shabbatEndDateFromNow: 0, // in seconds
    };
  }

  componentWillMount()  {
    // XMLHttpRequest
    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        let jsonResponse = JSON.parse(request.responseText);
        let shabbatStartDate = moment(jsonResponse.items[0].date);
        let shabbatEndDate = moment(jsonResponse.items[2].date);

        this.setState({
          shabbatStartDate: shabbatStartDate,
          shabbatEndDate: shabbatEndDate,
        });
      } else {
        console.warn('error');
        alert('error');
      }
    };
    request.open('GET', 'http://www.hebcal.com/shabbat/?cfg=json&m=50&latitude=48.864716&longitude=2.349014&tzid=Europe/Paris');
    request.send();
  }

  render() {
    return (
      <View>
        <Text style={styles.schedules}>
          <Text>
            Shabbat starts:{'\n'}
          </Text>
          <Text style={styles.white}>
            {this.state.shabbatStartDate.format("ddd, MMM Do YYYY, H:mm")}{'\n'}
          </Text>
          <Text style={styles.countdown}>
            {this.state.shabbatStartDate.fromNow()}{'\n'}
          </Text>
        </Text>
        <Text style={styles.schedules}>
          <Text>
            Shabbat ends:{'\n'}
          </Text>
          <Text style={styles.white}>
            {this.state.shabbatEndDate.format("ddd, MMM Do YYYY, H:mm")}{'\n'}
          </Text>
          <Text style={styles.countdown}>
            {this.state.shabbatEndDate.fromNow()}{'\n'}
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  schedules: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  white: {
    color: '#777',
  },
  countdown: {
    color: '#fff',
    fontSize: 30,
  },
  right: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'green',
  },
});
