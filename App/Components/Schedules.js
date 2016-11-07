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
      shabbatStartDateFromNow: "...", // in seconds
      shabbatEndDateFromNow: "...", // in seconds
    };

    setInterval(() => {
      this.setState({
        shabbatStartDateFromNow: this.state.shabbatStartDate.fromNow(),
        shabbatEndDateFromNow: this.state.shabbatEndDate.fromNow(),
      });
    }, 1000);
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
            Shabbat{' '}
            {this.state.shabbatStartDate.isBefore(moment()) ? "est entré" : "entre"} {this.state.shabbatStartDateFromNow+'\n'}
          </Text>
          <Text style={styles.white}>
            {this.state.shabbatStartDate.format("dddd").toUpperCase().substring(0,3)+". "+this.state.shabbatStartDate.date()+" à "+this.state.shabbatStartDate.format("H:mm")+'\n'}
          </Text>
        </Text>
        <Text style={styles.schedules}>
          <Text>
            et{' '}
            {this.state.shabbatEndDate.isBefore(moment()) ? "est sorti" : "sort"} {this.state.shabbatEndDateFromNow+'\n'}
          </Text>
          <Text style={styles.white}>
            {this.state.shabbatEndDate.format("dddd").toUpperCase().substring(0,3)+". "+this.state.shabbatEndDate.date()+" à "+this.state.shabbatEndDate.format("H:mm")+'\n'}
          </Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  schedules: {
    color: '#9B9B9B',
    fontSize: 28,
  },
  white: {
    color: '#fff',
  },
  countdown: {
    color: '#fff',
    fontSize: 30,
  },
});
