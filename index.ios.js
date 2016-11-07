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
import Geolocation from './App/Components/Geolocation';

var moment = require('moment');

function getDayName(dateString) {
  return ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'][new Date(dateString).getDay()];
}


export default class ShabbatClock extends Component {

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

          setInterval(() => {
            this.setState({
              shabbatStartDate: shabbatStartDate,
              shabbatEndDate: shabbatEndDate,
            });
          }, 1000);

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
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Clock />
        </View>
        <View style={styles.schedulesContainer}>
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
