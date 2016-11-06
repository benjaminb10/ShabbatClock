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


function getDayName(dateString) {
  return ['DIM.', 'LUN.', 'MAR.', 'MER.', 'JEU.', 'VEN.', 'SAM.'][new Date(dateString).getDay()];
}


export default class ShabbatClock extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   shabbatStartDate: new Date(),
    //   shabbatEndDate: new Date(),
    // };

    this.state = { shabbatStartDate: new Date() };



  }



  render() {


    let date = this.state.shabbatStartDate;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let time = (hours<10 ? '0'+hours : hours)+":"+(minutes<10 ? '0'+minutes : minutes);

    return (
      <View style={styles.container}>
        <View style={styles.timeContainer}>
          <Clock />
        </View>
        <View style={styles.schedulesContainer}>
          <Text style={styles.schedules}>
            <Text>
              Shabbat entrera{'\n'}
            </Text>
            <Text style={styles.white}>
              {getDayName(date)+" "+date.getDate()}{'\n'}
            </Text>
          </Text>
          <Text style={styles.schedules}>
            <Text>
              et sortira{'\n'}
            </Text>
            <Text style={styles.white}>
              TODO
            </Text>
          </Text>
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
    flex: 0.6,
  },
  schedules: {
    color: '#9B9B9B',
    fontSize: 28,
  },
  white: {
    color: '#fff',
  },
  right: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: 'green',
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
